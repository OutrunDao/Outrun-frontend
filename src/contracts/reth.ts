import { Token } from '@/packages/swap-core/entities/token';
import { ChainId } from './chains';
/**
 * Known RETH implementation addresses, used in our implementation of Ether#wrapped
 */
export const RETH: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    '0xF62f5dB01cb60d80219F478D5CDffB6398Cee9A5',
    18,
    'ORETH',
    'Wrapped Ether'
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    '0xF62f5dB01cb60d80219F478D5CDffB6398Cee9A5',
    18,
    'ORETH',
    'Wrapped Ether'
  ),
};
