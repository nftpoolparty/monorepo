// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NftPoolFactory.sol";

contract NftPoolFactoryTest is Test {
    NftPoolFactory factory;
    function setUp() public {
        factory = new NftPoolFactory();
    }

    function test_getLiquidityToProvide_returnsCorrectValue() public {
        uint256 initialPrice = 0.0002 ether;
        uint256 maxSupply = 10;

        uint256 expected = 0.0001 ether * maxSupply;

        assertEq(factory.getLiquidityToProvide(maxSupply, initialPrice), expected);
    }
}
