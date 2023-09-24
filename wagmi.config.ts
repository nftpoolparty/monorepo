import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      deployments: {
        NftPoolFactory: {
          [chains.foundry.id]: '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9',
          [534351]: '0x131F554482F26206A33acf5A22E89A91c5D91f9A'
        }
      },
    }),
    react(),
  ],
})
