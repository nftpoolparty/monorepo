// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import "forge-std/console.sol";
import "forge-std/console2.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {IPoolManager, PoolId, ILockCallback, PoolKey} from "v4-core/PoolManager.sol";
import {BalanceDelta} from "v4-core/types/BalanceDelta.sol";
import {TickMath} from "v4-core/libraries/TickMath.sol";
import {Currency} from "v4-core/types/Currency.sol";
import {UniNftHook} from "./UniNftHook.sol";
import {UniNftToken} from "./UniNftToken.sol";
import {LibUniNft} from "./LibUniNft.sol";
import {FixedPointMathLib} from "solmate/utils/FixedPointMathLib.sol";
import {LiquidityAmounts} from "v4-periphery/libraries/LiquidityAmounts.sol";
import {PoolIdLibrary} from "v4-core/types/PoolId.sol";

contract UniNftRouter is ILockCallback {
    using PoolIdLibrary for PoolKey;

    enum LockAction {
        CreateInitialPosition,
        BuyNft,
        SellNft
    }

    struct CreateInitialPositionData {
        UniNftHook hook;
        uint128 maxSupply;
        uint24 fee;
        uint128 value;
        bool quote;
    }

    struct BuyNftData {
        UniNftToken token;
        uint128 maxPrice;
        address receiver;
        bytes receiverData;
        bool quote; 
    }

    struct SellNftData {
        UniNftToken token;
        uint256 tokenId; 
        uint128 minPrice;
        address payable receiver;
    }

    error QuoteBuyRevert(uint256 price);
    error QuoteCreateInitialPositionError(uint256 ethNeeded, uint256 price);
    error QuoteCreateRevert(UniNftToken nftToken, uint256 ethNeeded, uint256 price);
    event Created(UniNftToken token, string name);

    IPoolManager public immutable MGR;
    mapping (UniNftToken => bool) public isValidToken;

    modifier onlyValidToken(UniNftToken token) {
        require(isValidToken[token], 'not a valid NFT token');
        _;
    }

    constructor(IPoolManager mgr) {
        MGR = mgr;
    }

    error FailedToRefund();

    function create(
        string memory nftName,
        string memory nftSymbol,
        uint128 maxSupply,
        string memory tokenUri,
        uint24 fee,
        uint256 hookSalt
    )
        external payable
        returns (UniNftToken nftToken, uint256 ethUsed)
    {
        bytes32 saltyHookSalt = keccak256(abi.encode(msg.sender, hookSalt));
        UniNftHook hook = new UniNftHook{salt: saltyHookSalt}(MGR, fee, nftName, nftSymbol, tokenUri);
        nftToken = hook.NFT();
        (ethUsed, ) = abi.decode(MGR.lock(
            abi.encode(
                LockAction.CreateInitialPosition,
                CreateInitialPositionData(hook, maxSupply, fee, uint128(msg.value), false)
            )
        ), (uint256, uint256));
        isValidToken[nftToken] = true;
        emit Created(nftToken, nftName);
        if (ethUsed < msg.value) {
            (bool success,) = payable(msg.sender).call{value: msg.value - ethUsed}("");
            revert FailedToRefund();
        }
    }

    function quoteCreate(
        string memory nftName,
        string memory nftSymbol,
        uint128 maxSupply,
        string memory tokenUri,
        uint24 fee,
        uint256 hookSalt,
        uint256 ethDeposit
    )
        external
        returns (UniNftToken nftToken, uint256 ethUsed, uint256 ethPrice)
    {
        try this.__quoteCreateAndRevert(
            nftName,
            nftSymbol,
            maxSupply,
            tokenUri,
            fee,
            hookSalt,
            ethDeposit,
            msg.sender
        ) {
            assert(false);
        } catch (bytes memory err) {
            bytes4 selector; 
            assembly { selector := mload(add(err, 0x20)) }
            if (selector == QuoteCreateRevert.selector) {
                assembly {
                    nftToken := mload(add(err, 0x24))
                    ethUsed := mload(add(err, 0x44))
                    ethPrice := mload(add(err, 0x64))
                }
                return (nftToken, ethUsed, ethPrice);
            }
            assembly { revert(add(err, 0x20), mload(err)) }
        }
    }

    function __quoteCreateAndRevert(
        string memory nftName,
        string memory nftSymbol,
        uint128 maxSupply,
        string memory tokenUri,
        uint24 fee,
        uint256 hookSalt,
        uint256 ethDeposit,
        address caller
    )
        external
    {
        bytes32 saltyHookSalt = keccak256(abi.encode(caller, hookSalt));
        UniNftHook hook = new UniNftHook{salt: saltyHookSalt}(MGR, fee, nftName, nftSymbol, tokenUri);
        UniNftToken nftToken = hook.NFT();
        isValidToken[nftToken] = true;
        try 
            MGR.lock(
                abi.encode(
                    LockAction.CreateInitialPosition,
                    CreateInitialPositionData(hook, maxSupply, fee, uint128(ethDeposit), true)
                )
            )
            { assert(false); }
        catch (bytes memory err) {
            uint256 ethUsed;
            uint256 ethPrice;
            bytes4 selector; 
            assembly { selector := mload(add(err, 0x20)) }
            if (selector == QuoteCreateInitialPositionError.selector) {
                assembly {
                    ethUsed := mload(add(err, 0x24))
                    ethPrice := mload(add(err, 0x44))
                }
                revert QuoteCreateRevert(nftToken, ethUsed, ethPrice);
            }
            assembly { revert(add(err, 0x20), mload(err)) }
        }
    }

    function sellNft(
        UniNftToken token,
        uint256 tokenId,
        uint256 minPrice,
        address payable receiver
    )
        external
        returns (uint256 price)
    {
        token.transferFrom(msg.sender, address(this), tokenId);
        price = abi.decode(MGR.lock(
            abi.encode(
                LockAction.SellNft,
                SellNftData(token, tokenId, uint128(minPrice), receiver)
            )
        ), (uint256));
    }

    function quoteBuyNft(UniNftToken token) external onlyValidToken(token)
        returns (uint256 price)
    {
        try MGR.lock(
            abi.encode(
                LockAction.BuyNft,
                BuyNftData(token, type(uint128).max, address(1), "", true)
            )
        ) {
            assert(false);
        } catch (bytes memory err) {
            bytes4 selector; 
            assembly { selector := mload(add(err, 0x20)) }
            if (selector == QuoteBuyRevert.selector) {
                assembly {
                    price := mload(add(err, 0x24))
                }
               return price; 
            }
            assembly { revert(add(err, 0x20), mload(err)) }
        }
    }

    function buyNft(
        UniNftToken token,
        uint256 maxPrice,
        address receiver,
        bytes memory receiverData
    )
        external payable onlyValidToken(token)
        returns (uint256 price)
    {
        price = abi.decode(MGR.lock(
            abi.encode(
                LockAction.BuyNft,
                BuyNftData(token, uint128(maxPrice), receiver, receiverData, false)
            )
        ), (uint256));
        if (price < msg.value) {
            (bool success,) = payable(msg.sender).call{value: msg.value - price}("");
            revert FailedToRefund();
        }
    }

    function lockAcquired(bytes calldata data) external returns (bytes memory) {
        require(msg.sender == address(MGR), 'not manager');
        LockAction action = abi.decode(data, (LockAction));
        if (action == LockAction.CreateInitialPosition) {
            (, CreateInitialPositionData memory data_) = abi.decode(
                data,
                (uint256, CreateInitialPositionData)
            );
            return _createInitialPosition(data_);
        } else if (action == LockAction.BuyNft) {
            (, BuyNftData memory data_) = abi.decode(
                data,
                (uint256, BuyNftData)
            );
            return _buyNft(data_.token, data_.maxPrice, data_.receiver, data_.receiverData, data_.quote);
        } else if (action == LockAction.SellNft) {
            (, SellNftData memory data_) = abi.decode(
                data,
                (uint256, SellNftData)
            );
            return _sellNft(data_.token, data_.tokenId, data_.minPrice, data_.receiver);
        }
        return "";
    }

    function _createInitialPosition(CreateInitialPositionData memory data)
        private
        returns (bytes memory result)
    {
        PoolKey memory key = LibUniNft.getPoolKey(data.hook, data.fee);
        uint160 initialPrice = uint160(
            (FixedPointMathLib.sqrt(data.maxSupply * uint128(LibUniNft.RESOLUTION)) << 96) /
            FixedPointMathLib.sqrt(data.value)
        );
        MGR.initialize(key, initialPrice, "");
        // TODO: This should be from [initialPrice, inf+)?
        int24 tickLower = (TickMath.MIN_TICK / key.tickSpacing) * key.tickSpacing;
        int24 tickUpper = (TickMath.MAX_TICK / key.tickSpacing) * key.tickSpacing;
        IPoolManager.ModifyPositionParams memory params;
        params.tickLower = tickLower;
        params.tickUpper = tickUpper;
        params.liquidityDelta = int128(LiquidityAmounts.getLiquidityForAmounts(
            initialPrice,
            TickMath.getSqrtRatioAtTick(tickLower),
            TickMath.getSqrtRatioAtTick(tickUpper),
            data.value,
            data.maxSupply * uint128(LibUniNft.RESOLUTION)
        ));
        // DANGER!
        // TODO: This needs to be called by a dedicated addressed controlled by the creator.
        BalanceDelta delta = MGR.modifyPosition(key, params, "");
        int128 ethNeeded = delta.amount0();
        int128 erc20Needed = delta.amount1();

        if (data.quote) {
            assert(ethNeeded > 0);
            revert QuoteCreateInitialPositionError(uint128(ethNeeded), this.quoteBuyNft(data.hook.NFT()));
        }
        if (ethNeeded > 0) {
            MGR.settle{value: uint128(ethNeeded)}(Currency.wrap(address(0)));
        } else {
            ethNeeded = 0;
        }
        if (erc20Needed > 0) {
            MGR.settle(Currency.wrap(address(data.hook))); 
        }
        return abi.encode(ethNeeded, uint256(0));
    }

    function _ethToSqrtPrice(uint256 ethPrice) private pure returns (uint160 sqrtPrice) {
        return uint160(
            (FixedPointMathLib.sqrt(1 * LibUniNft.RESOLUTION) << 96) /
            FixedPointMathLib.sqrt(ethPrice)
        );
    }

    function _buyNft(
        UniNftToken token,
        uint128 maxPrice,
        address receiver,
        bytes memory receiverData,
        bool quote
    )
        private
        returns (bytes memory result)
    {
        UniNftHook hook = token.HOOK();
        PoolKey memory key = hook.getPoolKey();
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: true,
            amountSpecified: -1 * int128(uint128(LibUniNft.RESOLUTION)),
            sqrtPriceLimitX96: _ethToSqrtPrice(maxPrice)
        });
        BalanceDelta delta = MGR.swap(key, params, abi.encode(receiver, receiverData));
        int128 ethAmount = delta.amount0();
        int128 erc20Amount = delta.amount1();
        if (quote) {
            assert(ethAmount >= 0);
            revert QuoteBuyRevert(uint128(ethAmount));
        }
        if (ethAmount > 0) {
            MGR.settle{value: uint128(ethAmount)}(Currency.wrap(address(0)));
        } else {
            ethAmount = 0;
        }
        if (erc20Amount < 0) {
            MGR.take(Currency.wrap(address(hook)), address(1), uint128(-erc20Amount));
        }
        return abi.encode(ethAmount);
    }

    function _sellNft(
        UniNftToken token,
        uint256 tokenId, 
        uint128 minPrice,
        address payable receiver
    )
        private
        returns (bytes memory result)
    {
        UniNftHook hook = token.HOOK();
        PoolKey memory key = hook.getPoolKey();
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: false,
            amountSpecified: 1 * int128(uint128(LibUniNft.RESOLUTION)),
            sqrtPriceLimitX96: _ethToSqrtPrice(minPrice)
        });
        BalanceDelta delta = MGR.swap(key, params, abi.encode(tokenId));
        int128 ethAmount = delta.amount0();
        int128 erc20Amount = delta.amount1();
        if (ethAmount < 0) {
            MGR.take(Currency.wrap(address(0)), receiver, uint128(-ethAmount));
        } else {
            ethAmount = 0;
        }
        if (erc20Amount > 0) {
            MGR.settle(Currency.wrap(address(hook)));
        }
        return abi.encode(-ethAmount);
    }

    function findHookSalt(
        string memory nftName,
        string memory nftSymbol,
        string memory tokenUri,
        uint24 fee,
        address caller,
        uint256 saltStart
    )
        external view
        returns (uint256 salt)
    {
        uint256 PREFIX = Hooks.AFTER_SWAP_FLAG | Hooks.AFTER_MODIFY_POSITION_FLAG;
        uint256 LEADING_BIT_MASK = 255 << 152;
        bytes32 initHash = keccak256(abi.encodePacked(
            type(UniNftHook).creationCode,
            abi.encode(
                MGR,
                fee,
                nftName,
                nftSymbol,
                tokenUri
            )
        ));
        salt = saltStart;
        while (true) {
            uint256 h = uint256(keccak256(abi.encodePacked(
                '\xff',
                address(this),
                keccak256(abi.encode(caller, salt)),
                initHash
            )));
            if (LEADING_BIT_MASK & h == PREFIX) {
                break;
            }
            ++salt;
        }
    }
}
