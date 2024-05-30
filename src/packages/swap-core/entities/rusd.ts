import { Token } from './token';
import { ChainId } from '..';
/**
 * Blast usdt like coin: rusd
 */
export const RUSD: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    '0xe04b19ed724A328C804e82e7196dcef18570bfae',
    18,
    'ORUSD',
    'Wrapped ORUSD'
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    '0xe04b19ed724A328C804e82e7196dcef18570bfae',
    18,
    'ORUSD',
    'Wrapped ORUSD'
  ),
};
