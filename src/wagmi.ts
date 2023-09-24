import { configureChains, createConfig } from 'wagmi'
import { foundry, scrollTestnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { publicProvider } from 'wagmi/providers/public'

const scrollSepolia = {
  ...scrollTestnet,
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
  ],
  publicClient,
  webSocketPublicClient,
})
