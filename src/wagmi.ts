import { configureChains, createConfig } from 'wagmi'
import { foundry, scrollTestnet, baseGoerli } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { publicProvider } from 'wagmi/providers/public'
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';


const scrollSepolia = {
  ...scrollTestnet,
  id: 534351,
  rpcUrls: {
    default: {
      http: ['https://sepolia-rpc.scroll.io/'],
    },
    public: {
      http: ['https://sepolia-rpc.scroll.io/']
    }
  }
}

scrollTestnet.rpcUrls


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    scrollSepolia,
    ...(process.env.NODE_ENV === 'development' ? [foundry] : []),
  ],
  [
    publicProvider(),
  ],
)

// const { connectors } = ;


export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    ...getDefaultWallets({
      appName: 'My RainbowKit App',
      projectId: 'YOUR_PROJECT_ID',
      chains
    // @ts-ignore
    }).connectors()
  ],
  publicClient,
  webSocketPublicClient,
})

export { chains };