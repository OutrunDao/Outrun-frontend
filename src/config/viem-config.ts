import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { blastSepolia } from 'viem/chains';

export const walletClient = createWalletClient({
  chain: blastSepolia,
  transport: custom(window.ethereum),
});

export const publicClient = createPublicClient({
  chain: blastSepolia,
  transport: http(),
});
