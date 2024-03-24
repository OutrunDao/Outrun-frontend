import { LocalTokenSymbol, ContractAddrKey } from '@/types/index.d';
import { add } from '@/contants/address';
import RETHABI from './RETH';
import RETHStakeManager from './RETHStakeManager';

export const TokenABIMap: Record<LocalTokenSymbol | ContractAddrKey, any> = {
  [LocalTokenSymbol.RETH]: RETHABI,
  [LocalTokenSymbol.PETH]: RETHABI,
  [ContractAddrKey.RETHStakeManager]: RETHStakeManager,
};
