// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Script.sol";

import {NftPoolFactory} from "../contracts/NftPoolFactory.sol";

contract Deploy is Script {
    function setUp() public {}

    function run() public {
        uint256 deployer = vm.envUint("DEPLOYER_PRIVATE_KEY");

        vm.startBroadcast(deployer);

        new NftPoolFactory();
    }
}
