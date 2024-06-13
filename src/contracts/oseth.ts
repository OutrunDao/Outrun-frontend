import { Token } from '@/packages/swap-core/entities/token';
import { ChainId } from './chains';
import { addressMap } from './addressMap';
/**
 * Blast usdt like coin: rusd
 */
export const OSETH: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    addressMap[ChainId.BLAST_SEPOLIA].OSETH,
    18,
    'osETH',
    'osETH'
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(
    ChainId.BLAST,
    addressMap[ChainId.BLAST_SEPOLIA].OSETH,
    18,
    'osETH',
    'osETH'
  ),
};
