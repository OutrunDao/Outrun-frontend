import { Token } from './token';
import { ChainId } from '..';
/**
 * Blast usdt like coin: usdb
 */
export const USDB: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    '0x4200000000000000000000000000000000000022',
    18,
    'USDB',
    'Wrapped USDB'
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    '0x4200000000000000000000000000000000000022',
    18,
    'USDB',
    'Wrapped USDB'
  ),
};
