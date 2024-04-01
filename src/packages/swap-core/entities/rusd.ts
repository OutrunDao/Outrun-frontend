import { Token } from './token';
import { ChainId } from '..';
/**
 * Blast usdt like coin: rusd
 */
export const RUSD: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    '0x671540e1569b8E82605C3eEA5939d326C4Eda457',
    18,
    'RUSD',
    'Wrapped RUSD'
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    '0x671540e1569b8E82605C3eEA5939d326C4Eda457',
    18,
    'RUSD',
    'Wrapped RUSD'
  ),
};
