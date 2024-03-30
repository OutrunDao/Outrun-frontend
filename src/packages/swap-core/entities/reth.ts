import { Token } from './token';
import { ChainId } from '..';
/**
 * Known RETH implementation addresses, used in our implementation of Ether#wrapped
 */
export const RETH: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    '0x4E06Dc746f8d3AB15BC7522E2B3A1ED087F14617',
    18,
    'RETH',
    'Wrapped Ether'
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    '0x4E06Dc746f8d3AB15BC7522E2B3A1ED087F14617',
    18,
    'RETH',
    'Wrapped Ether'
  ),
};
