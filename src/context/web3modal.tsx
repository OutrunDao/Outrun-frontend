'use client';

import React, { ReactNode } from 'react';
import { config, projectId } from '@/config/web3modal';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { State, WagmiProvider } from 'wagmi';
import { blastSepolia } from 'viem/chains';

// Setup queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  defaultChain: blastSepolia,
  allowUnsupportedChain: false,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

export default function ContextProvider({ children, initialState }: { children: ReactNode; initialState?: State }) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
