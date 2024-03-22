export enum ChainId {
  BLAST_SEPOLIA = 168587773,
  BLAST = 81457,
}

export const SUPPORTED_CHAINS = [ChainId.BLAST_SEPOLIA, ChainId.BLAST] as const;
export type SupportedChainsType = (typeof SUPPORTED_CHAINS)[number];

export enum NativeCurrencyName {
  // Strings match input for CLI
  ETHER = 'ETH',
}
