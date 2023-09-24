import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      deployments: {
        UniNftRouter: {
          [chains.foundry.id]: '0xd04fF4A75Edd737A73E92b2F2274Cb887d96E110',
          [534351]: '0x2093fa634730172d29c618879428336b021f7732'
        }
      },
    }),
    react(),
  ],
})
