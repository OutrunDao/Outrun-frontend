'use client';

import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/app.css';
import theme from '@/theme/theme';

// customTheme.config.useSystemColorMode = true;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }} theme={theme}>
      {children}
    </ChakraProvider>
  );
}
