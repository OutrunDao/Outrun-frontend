import { LocalTokenSymbol, TokenAddressMap, ContractAddrKey } from '@/types/index.d';

type AddrMap = Record<string, `0x${string}`>;

export const ContractAddressMap: AddrMap = {
  [ContractAddrKey.OutETHVault]: '0x6a120b799AEF815fDf2a571B4BD7Fcfe93160135',
  [ContractAddrKey.OutUSDBVault]: '0xC9dBa182b33B3dc8D08e6262ebfB156636fD1d3a',
  [ContractAddrKey.RETHStakeManager]: '0x30B16aD242cd93F5f3171Ed7Ac54b957cEbBE7Eb',
  [ContractAddrKey.RUSDStakeManager]: '0x0581B5a119805B8C53303604304DeCFc0AC207fc',
  [ContractAddrKey.OutswapV1Factory]: '0x3cEca1C6e131255e7C95788D40581934E84A1F9d',
  [ContractAddrKey.OutswapV1Router]: '0xd48CA5f376A9abbee74997c226a55D71b4168790',
  [ContractAddrKey.EthFFLauncher]: '0xd6b4F6b708572D34325fe18ee93AFFD76758C7c1',
};

export const LocalTokenAddress: Record<LocalTokenSymbol, `0x${string}`> = {
  [LocalTokenSymbol.ETH]: '0xdaC9Ed63dada8A7005ce2c69F8FF8bF6C272a3D0',
  [LocalTokenSymbol.RETH]: '0x4E06Dc746f8d3AB15BC7522E2B3A1ED087F14617',
  [LocalTokenSymbol.PETH]: '0xc22ac43F6d2B59B809f04C78144e7E362d057A23',
  [LocalTokenSymbol.REY]: '0xA2a9e7AA2610d465eeE20cEBF3309990CF5e96Df',
  [LocalTokenSymbol.USDB]: '0x4200000000000000000000000000000000000022',
  [LocalTokenSymbol.RUSD]: '0x671540e1569b8E82605C3eEA5939d326C4Eda457',
  [LocalTokenSymbol.PUSD]: '0x08434dFA5732F2729641370538B980dE12A8b6aE',
  [LocalTokenSymbol.RUY]: '0x3C6C95feBeC696f62DBFd3f7bB4BadAd5A65A638',
};
