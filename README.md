## NFT Pool Party

NFT Pool Party is a Uniswap v4 hack using the all new hooks architecture to allow new NFTs to be minted and traded from a liquidity pool. Swap hooks maintain a virtual ERC20 token balance on the pool with each trade, minting and holding an equivalent number of ERC721 tokens at the same time. Because creators are initially the sole LP for all tokens in the pool, they can continue to enjoy demi-perpetual royalties on their collections in the form of LP fees!

The ERC721 tokens minted on this platform function as fully compatible ERC721s outside of the pool and can be freely trading on all other exchanges.


This is an ETHNY 2023 hackathon project so the code is very messy and definitely not production ready so use at your own risk!

## Major Components

- [UniNftRouter](./contracts/UniNftRouter.sol): The canonical entry point contract for creating and interacting with these pools.
- [UniNftToken](./contracts/UniNftToken.sol): The creator's ERC721 token that gets minted by the pool.
- [UniNftHook](./contracts/UniNftHook.sol): The Uniswap V4 hook contract, which also acts as the virtual ERC20 token for one half of the pool's reserves.