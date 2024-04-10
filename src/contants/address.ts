import { LocalTokenSymbol, TokenAddressMap, ContractAddrKey } from '@/types/index.d';

type AddrMap = Record<string, `0x${string}`>;

export const ContractAddressMap: AddrMap = {
  [ContractAddrKey.OutETHVault]: '0x1af328B3aa9B83760A5Adf8BD7ab3fe2F0A527e0',
  [ContractAddrKey.OutUSDBVault]: '0x656F907f21ac74A42F7BD44f3221f67F7c22e21c',
  [ContractAddrKey.RETHStakeManager]: '0xEc328C1732a9b16ee4095e06Da2ae09E72E8c9E6',
  [ContractAddrKey.RUSDStakeManager]: '0x002c755D3da3dA4c692EEd16222e9805dF92b5C9',
  [ContractAddrKey.OutswapV1Factory]: '0x3cEca1C6e131255e7C95788D40581934E84A1F9d',
  [ContractAddrKey.OutswapV1Router]: '0xd48CA5f376A9abbee74997c226a55D71b4168790',
  [ContractAddrKey.EthFFLauncher]: '0xd6b4F6b708572D34325fe18ee93AFFD76758C7c1',
};

export const LocalTokenAddress: Record<LocalTokenSymbol, `0x${string}`> = {
  [LocalTokenSymbol.ETH]: '0xdaC9Ed63dada8A7005ce2c69F8FF8bF6C272a3D0',
  [LocalTokenSymbol.RETH]: '0x6C10949966cA4A3bAccF236767BDCD8AD23Bda9a',
  [LocalTokenSymbol.PETH]: '0x788D01bCA12224DD6a85af49c2C15a2Aa0C85fC9',
  [LocalTokenSymbol.REY]: '0xe677448C548CC0AcF0019BC780ba93CD85e462c5',
  [LocalTokenSymbol.USDB]: '0x4200000000000000000000000000000000000022',
  [LocalTokenSymbol.RUSD]: '0xeA3037170670df423B52CdDdDAe06569b4d1EcD3',
  [LocalTokenSymbol.PUSD]: '0x0fb4dE81E60F89b046d7F4ae5f758A36af27e86D',
  [LocalTokenSymbol.RUY]: '0x18fB15A2dB54aeB70206a191A5d1632a6AC1D4eB',
};
