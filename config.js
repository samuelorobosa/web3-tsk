import { createConfig, http, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
  ],
  storage: createStorage({ storage: window.localStorage }), 
  syncConnectedChain: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
  },
})