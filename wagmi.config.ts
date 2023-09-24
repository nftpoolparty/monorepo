import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      deployments: {
        UniNftRouter: {
          [chains.foundry.id]: '0xe1DA8919f262Ee86f9BE05059C9280142CF23f48',
          [534351]: '0x2093fa634730172d29c618879428336b021f7732'
        }
      },
    }),
    react(),
  ],
})
