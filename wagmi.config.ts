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
          [534351]: '0xA631FFd30AedD6eDc4B30a9Ad55a8b9776718817',
          [chains.baseGoerli.id]: '0x5052ca1471ac16821cbfaa0b1219da6351c8d0a6'
        }
      },
    }),
    react(),
  ],
})
