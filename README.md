## NFT Pool Party

NFT Pool Party is a Uniswap v4 hack using the all new hooks architecture to allow new NFTs to be minted and traded from a liquidity pool. Swap hooks maintain a virtual ERC20 token balance on the pool with each trade, minting and holding an equivalent number of ERC721 tokens at the same time. Because creators are initially the sole LP for all tokens in the pool, they can continue to enjoy demi-perpetual royalties on their collections in the form of LP fees!

The ERC721 tokens minted on this platform function as fully compatible ERC721s outside of the pool and can be freely trading on all other exchanges.


This is an ETHNY 2023 hackathon project so the code is very messy and definitely not production ready so use at your own risk!

## Major Components

- [UniNftRouter](./contracts/UniNftRouter.sol): The canonical entry point contract for creating and interacting with these pools.
- [UniNftToken](./contracts/UniNftToken.sol): The creator's ERC721 token that gets minted by the pool.
- [UniNftHook](./contracts/UniNftHook.sol): The Uniswap V4 hook contract, which also acts as the virtual ERC20 token for one half of the pool's reserves.

## Contract Deployments

The UniNftRouter and it's related contracts are deployed to Scroll Sepolia and Base Goerli:

| Contract Name | Chain | Address |
| ------------- | ----- | ------- |
| UniNftRouter | Scroll Sepolia | [0xA631FFd30AedD6eDc4B30a9Ad55a8b9776718817](https://sepolia-blockscout.scroll.io/address/0xA631FFd30AedD6eDc4B30a9Ad55a8b9776718817/contracts#address-tabs) |
| UniNftRouter | Base Goerli | [0x5052ca1471ac16821cbfaa0b1219da6351c8d0a6](https://goerli.basescan.org/address/0x5052ca1471ac16821cbfaa0b1219da6351c8d0a6#code) | 