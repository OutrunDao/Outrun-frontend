export enum LocalTokenSymbol {
  'ETH' = 'ETH',
  'USDB' = 'USDB',
  'RETH' = 'RETH',
  'PETH' = 'PETH',
  'REY' = 'REY',
  'RUSD' = 'RUSD',
  'PUSD' = 'PUSD',
  'RUY' = 'RUY',
}

export interface TokenAddressMap {
  [LocalTokenSymbol]: string;
}

export interface PositionDetails {
  nonce: BigNumber;
  tokenId: BigNumber;
  operator: string;
  token0: string;
  token1: string;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: BigNumber;
  feeGrowthInside0LastX128: BigNumber;
  feeGrowthInside1LastX128: BigNumber;
  tokensOwed0: BigNumber;
  tokensOwed1: BigNumber;
}
