// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Hooks} from 'v4-core/libraries/Hooks.sol';
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {Currency} from "v4-core/types/Currency.sol";
import {BaseHook} from './BaseHook.sol';
import {UniNftToken} from "./UniNftToken.sol";
import {LibUniNft} from "./LibUniNft.sol";
import {BalanceDelta} from "v4-core/types/BalanceDelta.sol";


contract UniNftHook is BaseHook {
    UniNftToken public immutable NFT;
    address immutable ROUTER;
    uint256 public constant decimals = 18;
    uint256 totalSupply;
    uint24 _fee;
    string public name;
    string public symbol;

    constructor(
        IPoolManager mgr,
        uint24 fee,
        string memory name_,
        string memory symbol_,
        string memory tokenUri
    ) BaseHook(mgr) {
        ROUTER = msg.sender;
        NFT = new UniNftToken(mgr, this, fee, name_, symbol_, tokenUri);
        name = name_;
        symbol = symbol_;
        _fee = fee;
    }

    function getPoolKey() external view returns (PoolKey memory key) {
        key = LibUniNft.getPoolKey(this, _fee);
    }

    function balanceOf(address owner) external view returns (uint256) {
        if (owner == address(poolManager)) {
            return totalSupply;
        }
        return 0;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        // No-op. 
        return true;
    }

    function getHooksCalls() public pure override(BaseHook) returns (Hooks.Calls memory) {
        return Hooks.Calls({
            beforeInitialize: false,
            afterInitialize: false,
            beforeModifyPosition: false,
            afterModifyPosition: false,
            beforeSwap: false,
            afterSwap: true,
            beforeDonate: false,
            afterDonate: false
        });
    }

    function mintToPool(uint256 amount) external {
        // TODO: Won't need this with initialize hook. 
        require(msg.sender == ROUTER, 'not router');
        totalSupply += amount;
    }
    
    function _burnFromPool(uint256 amount) private {
        totalSupply -= amount;
    }

    function afterSwap(
        address sender,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        BalanceDelta delta,
        bytes calldata hookData
    )
        external override returns (bytes4)
    {
        int128 ethNeeded = delta.amount0();
        int128 erc20Needed = delta.amount1();
        int256 tokenCount = erc20Needed / int256(LibUniNft.RESOLUTION);
        require(tokenCount * int256(LibUniNft.RESOLUTION) == erc20Needed, 'must swap a whole NFT');
        if (tokenCount < 0) {
            // Buy
            (address receiver, bytes memory receiverData) = abi.decode(hookData, (address, bytes));
            NFT.claimOrMint(receiver, receiverData);
            totalSupply -= uint128(-erc20Needed);
            assert(ethNeeded >= 0);
        } else {
            // Sell
            (uint256 tokenId) = abi.decode(hookData, (uint256));
            NFT.stash(sender, tokenId);
            assert(ethNeeded <= 0);
            totalSupply += uint128(erc20Needed);
        }
        return this.afterSwap.selector;
    }
}
