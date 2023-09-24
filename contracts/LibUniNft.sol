// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import {PoolKey, Currency} from "v4-core/PoolManager.sol";
import {UniNftHook} from "./UniNftHook.sol";

library LibUniNft {
    uint256 internal constant RESOLUTION = 1e18;

    function getPoolKey(
        UniNftHook hook,
        uint24 fee
    )
        internal pure
        returns (PoolKey memory key)
    {
        (Currency currency0, Currency currency1) = 
            (Currency.wrap(address(0)), Currency.wrap(address(hook)));
        key = PoolKey(currency0, currency1, fee, getTickSpacing(fee), hook);
    }

    function getTickSpacing(uint24 fee)
        internal pure
        returns (int24 spacing)
    {
        spacing = int24(fee / 100 * 2);
    }
}