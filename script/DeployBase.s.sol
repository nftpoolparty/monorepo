// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Script.sol";

import {UniNftRouter} from "contracts/UniNftRouter.sol";
import {PoolManager} from "v4-core/PoolManager.sol";

contract Deploy is Script {
    function setUp() public {}

    function run() public {
        uint256 deployer = vm.envUint("DEPLOYER_PRIVATE_KEY");

        PoolManager poolManager = PoolManager(payable(0x693B1C9fBb10bA64F0d97AE042Ee32aE9Eb5610D));

        vm.startBroadcast(deployer);
        new UniNftRouter(poolManager);
    }
}
