"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from './theme'

customTheme.config.useSystemColorMode = true;

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
