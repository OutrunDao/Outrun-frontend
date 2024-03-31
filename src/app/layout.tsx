import { Inter } from 'next/font/google';
import { Providers } from './providers';
import PageLayout from '@/components/PageLayout';
import Web3ContextProvider from '@/context/web3modal';
import { config as web3Config } from '@/config/web3modal';
import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Outrun App',
  description: 'Outrun app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(web3Config, headers().get('cookie'));
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Web3ContextProvider initialState={initialState}>
            <PageLayout>{children}</PageLayout>
          </Web3ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
