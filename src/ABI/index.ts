import { LocalTokenSymbol, ContractAddrKey } from '@/types/index.d';
import RETHABI from './RETH';
import RETHStakeManager from './RETHStakeManager';

export const TokenABIMap = {
  [LocalTokenSymbol.ETH]: RETHABI,
  [LocalTokenSymbol.RETH]: RETHABI,
  [LocalTokenSymbol.PETH]: RETHABI,
  [LocalTokenSymbol.REY]: RETHABI,
  [LocalTokenSymbol.RUY]: RETHABI,
  [LocalTokenSymbol.RUSD]: RETHABI,
  [ContractAddrKey.RETHStakeManager]: RETHStakeManager,
};
