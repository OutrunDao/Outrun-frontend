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
export type SwitchState = 0 | 1;

export const PairSelectList = {
  [TabType.Mint]: {
    0: [LocalTokenSymbol.ETH, LocalTokenSymbol.USDB],
    1: [LocalTokenSymbol.RETH, LocalTokenSymbol.RUSD],
  },
  [TabType.Stake]: {
    0: [LocalTokenSymbol.RETH, LocalTokenSymbol.RUSD],
    1: [LocalTokenSymbol.PETH, LocalTokenSymbol.PUSD],
  },
};

export const TokenPairMap = {
  [TabType.Mint]: {
    [LocalTokenSymbol.ETH]: LocalTokenSymbol.RETH,
    [LocalTokenSymbol.USDB]: LocalTokenSymbol.RUSD,
    [LocalTokenSymbol.RETH]: LocalTokenSymbol.ETH,
    [LocalTokenSymbol.RUSD]: LocalTokenSymbol.USDB,
  },
  [TabType.Stake]: {
    [LocalTokenSymbol.RETH]: LocalTokenSymbol.PETH,
    [LocalTokenSymbol.RUSD]: LocalTokenSymbol.PUSD,
    [LocalTokenSymbol.PETH]: LocalTokenSymbol.RETH,
    [LocalTokenSymbol.PUSD]: LocalTokenSymbol.RUSD,
  },
};

export type TokenMint = keyof (typeof TokenPairMap)[TabType.Mint];
export type TokenStake = keyof (typeof TokenPairMap)[TabType.Stake];

export type BtnHandleState = MintType | StakeType;
