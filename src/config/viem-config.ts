'use client';

import { WalletClient, createWalletClient, createPublicClient, custom, http } from 'viem';
import { blastSepolia } from 'viem/chains';

export const writeClient = async () => {
  const [account] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as `0x${string}`[];
  return createWalletClient({
    account,
    chain: blastSepolia,
    transport: window && custom(window.ethereum),
  });
};

export const publicClient = createPublicClient({
  chain: blastSepolia,
  transport: http(),
});
