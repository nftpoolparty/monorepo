import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      deployments: {
        NftPoolFactory: {
          [chains.foundry.id]: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        },
        MultiEdition721: {
        }
      },
    }),
    react(),
  ],
})
