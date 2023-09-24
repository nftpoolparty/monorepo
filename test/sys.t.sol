// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/console.sol";
import {PoolManager, PoolKey} from "v4-core/PoolManager.sol";
import {UniNftRouter} from "contracts/UniNftRouter.sol";
import {UniNftToken} from "contracts/UniNftToken.sol";
import "forge-std/Test.sol";

contract SysTest is Test {
    event Transfer(address indexed from, address indexed to, uint256 indexed id);

    uint24 constant FEE = 0.025e4; // 2.5%
    uint96 constant MAX_SUPPLY = 100;
    PoolManager immutable mgr;
    UniNftRouter immutable router;
    UniNftToken nftToken;

    constructor() {
        mgr = new PoolManager(50_000);
        router = new UniNftRouter(mgr);
    } 
    

    function setUp() external {
        (nftToken,) = router.create{ value: 0.1 ether}(
            "TEST",
            "TST",
            MAX_SUPPLY,
            "",
            FEE,
            router.findHookSalt("TEST", "TST", "", FEE, address(this), 12345)
        );
        nftToken.setApprovalForAll(address(router), true);
    }

    function test_canQuoteCreate() external {
        uint256 salt = router.findHookSalt("??", "??", "??", FEE, address(this), 123);
        (UniNftToken expectedNft, uint256 expectedEthUsed, uint256 expectedPrice) = router.quoteCreate(
            "??",
            "??",
            MAX_SUPPLY,
            "??",
            FEE,
            salt,
            0.1 ether
        );
        (UniNftToken actualNft, uint256 actualEthUsed) = router.create{ value: 0.1 ether}(
            "??",
            "??",
            MAX_SUPPLY,
            "??",
            FEE,
            salt
        );
        assertEq(address(expectedNft), address(actualNft));
        assertEq(expectedEthUsed, actualEthUsed);
        uint256 actualPrice = router.quoteBuyNft(actualNft);
        assertEq(expectedPrice, actualPrice);
    }

    function test_canQuoteBuy() external {
        uint256 expectedPrice = router.quoteBuyNft(nftToken);
        uint256 actualPrice = router.buyNft{value: 1 ether}(
            nftToken,
            type(uint256).max, 
            address(this),
            ""
        );
        assertEq(expectedPrice, actualPrice);
    }

    function test_canMint() external {
        vm.expectEmit(true, true, true, false);
        emit Transfer(address(0), address(this), 1);
        router.buyNft{value: 1 ether}(
            nftToken,
            type(uint256).max, 
            address(this),
            ""
        );
    }

    function test_canMintThenSell() external {
        router.buyNft{value: 1 ether}(
            nftToken,
            type(uint256).max, 
            address(this),
            ""
        );
        vm.expectEmit(true, true, true, false);
        emit Transfer(address(this), address(router), 1);
        vm.expectEmit(true, true, true, false);
        emit Transfer(address(router), address(nftToken), 1);
        router.sellNft(
            nftToken,
            1,   
            1, 
            payable(this)
        );
    }

    function test_canMintThenSellThenBuyThenMint() external {
        router.buyNft{value: 1 ether}(
            nftToken,
            type(uint256).max, 
            address(this),
            ""
        );
        router.sellNft(
            nftToken,
            1,   
            1, 
            payable(this)
        );
        vm.expectEmit(true, true, true, false);
        emit Transfer(address(nftToken), address(this), 1);
        router.buyNft{value: 1 ether}(
            nftToken,
            type(uint256).max, 
            address(this),
            ""
        );
        vm.expectEmit(true, true, true, false);
        emit Transfer(address(0), address(this), 2);
        router.buyNft{value: 1 ether}(
            nftToken,
            type(uint256).max, 
            address(this),
            ""
        );
    }

    function onERC721Received(address, address, uint256 tokenId, bytes calldata)
        external
        view
        returns (bytes4)
    {
        console.log('received token id', tokenId);
        return this.onERC721Received.selector;
    }

    receive() external payable {}
}
