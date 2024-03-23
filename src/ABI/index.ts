import { LocalTokenSymbol } from '@/types/index.d';
import RETHABI from './RETH';

export const TokenABIMap: Record<LocalTokenSymbol, any> = {
  [LocalTokenSymbol.RETH]: RETHABI,
};
