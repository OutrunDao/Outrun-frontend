import { LocalTokenSymbol, TokenAddressMap } from '@/types/index.d';

export const enum TabType {
  Mint = 'Mint',
  Stake = 'Stake',
}

export const enum MintType {
  Mint = 'Mint',
  Redeem = 'Redeem',
}

export const enum StakeType {
  Stake = 'Stake',
  Unstake = 'Unstake',
}

export const tabList = [
  { key: TabType.Mint, label: TabType.Mint },
  { key: TabType.Stake, label: TabType.Stake },
];

// Mint的交易对
export const MintPairs = [
  [LocalTokenSymbol.ETH, LocalTokenSymbol.RETH],
  [LocalTokenSymbol.USDB, LocalTokenSymbol.RUSD],
];

// stake的交易对
export const StakePairs = [
  [LocalTokenSymbol.RETH, LocalTokenSymbol.PETH],
  [LocalTokenSymbol.RUSD, LocalTokenSymbol.PUSD],
  [LocalTokenSymbol.REY, LocalTokenSymbol.RUY],
];

export const PairSelectList = {
  [TabType.Mint]: MintPairs,
  [TabType.Stake]: StakePairs,
};

export interface IIswitch {
  [TabType.Mint]: 0 | 1;
  [TabType.Stake]: 0 | 1;
}
