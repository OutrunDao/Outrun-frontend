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

export const enum SupportCoins {
  ETH = 'ETH',
  RETH = 'RETH',
}

export interface IIswitch {
  [TabType.Mint]: boolean;
  [TabType.Stake]: boolean;
}
