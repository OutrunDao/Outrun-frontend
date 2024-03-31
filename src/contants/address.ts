import { LocalTokenSymbol, TokenAddressMap, ContractAddrKey } from '@/types/index.d';

type AddrMap = Record<string, `0x${string}`>;

export const ContractAddressMap: AddrMap = {
  [ContractAddrKey.OutETHVault]: '0x611F3e1568cafDff2A1AF9695821e8CB65abFcb6',
  [ContractAddrKey.OutUSDBVault]: '0xC9dBa182b33B3dc8D08e6262ebfB156636fD1d3a',
  [ContractAddrKey.RETHStakeManager]: '0xC5Bb4e3C1e6143E6d70D65Ce51CA43f5da02dF24',
  [ContractAddrKey.RUSDStakeManager]: '0x93Ff1C58D4602282E6caD4459FCD1246af846204',
  [ContractAddrKey.OutswapV1Factory]: '0x5A32bca57480f0B9910EcDB8DB854649b1E4F38C',
  [ContractAddrKey.OutswapV1Router]: '0x7a90a8d701584e9029c14b444a519eC33567F388',
  [ContractAddrKey.EthFFLauncher]: '0xE5Bb547f3258aFe21E8e783ab703478486c645e9',
};

export const LocalTokenAddress: Record<LocalTokenSymbol, `0x${string}`> = {
  [LocalTokenSymbol.ETH]: '0xdaC9Ed63dada8A7005ce2c69F8FF8bF6C272a3D0',
  [LocalTokenSymbol.RETH]: '0xdaC9Ed63dada8A7005ce2c69F8FF8bF6C272a3D0',
  [LocalTokenSymbol.PETH]: '0x71e6A18c57F8794134A8e7088A61bBec22Cf1777',
  [LocalTokenSymbol.REY]: '0xB3E81F1552d6be2410DDe248192bf40b8037d89c',
  [LocalTokenSymbol.USDB]: '0x4200000000000000000000000000000000000022',
  [LocalTokenSymbol.RUSD]: '0xef2CdD12E6AE75C6e7ab69105520A12181991657',
  [LocalTokenSymbol.PUSD]: '0xed3C3F323A5Bb6C630F00d0906076ae02605D239',
  [LocalTokenSymbol.RUY]: '0x9933b2138234deCF0A728c04c4E8aF5EDD0D85e2',
};
