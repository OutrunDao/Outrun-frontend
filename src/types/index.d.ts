/// <reference types="react-scripts" />

interface Window {
  ethereum: any;
}

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

export enum ContractAddrKey {
  OutETHVault = 'OutETHVault',
  OutETHVault = 'OutETHVault',
  OutUSDBVault = 'OutUSDBVault',
  RETHStakeManager = 'RETHStakeManager',
  RUSDStakeManager = 'RUSDStakeManager',
  OutswapV1Factory = 'OutswapV1Factory',
  OutswapV1Router = 'OutswapV1Router',
  EthFFLauncher = 'EthFFLauncher',
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
