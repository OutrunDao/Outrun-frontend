import { LocalTokenSymbol, ContractAddrKey } from '@/types/index.d';
import RETHABI from './RETH.json';
import RETHStakeManager from './RETHStakeManager.json';

export const TokenABIMap = {
  [LocalTokenSymbol.ETH]: RETHABI,
  [LocalTokenSymbol.RETH]: RETHABI,
  [LocalTokenSymbol.PETH]: RETHABI,
  [LocalTokenSymbol.REY]: RETHABI,
  [LocalTokenSymbol.RUY]: RETHABI,
  [LocalTokenSymbol.RUSD]: RETHABI,
  [ContractAddrKey.RETHStakeManager]: RETHStakeManager,
};
