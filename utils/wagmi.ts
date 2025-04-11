import { http } from 'viem';
import { baseSepolia } from 'wagmi/chains';
import { createConfig } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});
