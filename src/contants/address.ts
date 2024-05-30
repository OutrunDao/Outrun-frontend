import { LocalTokenSymbol, TokenAddressMap, ContractAddrKey } from '@/types/index.d';

type AddrMap = Record<ContractAddrKey, `0x${string}`>;

export const ContractAddressMap: AddrMap = {
  [ContractAddrKey.OutETHVault]: '0x3f2d57CE50F5ec7ba4FD198B5c25B3b1a72fF95B',
  [ContractAddrKey.OutUSDBVault]: '0x3c3e396Aa3841F3513Cc972Ac9E1e2e9F9E50943',
  [ContractAddrKey.RETHStakeManager]: '0x7F5b6C208D2F426F17caae9db9331B9CB7a4a0CF',
  [ContractAddrKey.RUSDStakeManager]: '0xC138764f11D922a4dB7bc4A83fD9bA10F7cfCDe1',
  [ContractAddrKey.OutswapV1Factory]: '0xb65EEEa6f65A2991F582c65D0f86557320446070',
  [ContractAddrKey.OutswapV1Router]: '0x354Ecc33f434D111405F1f3B19FE013c3bEFcb73',
  [ContractAddrKey.EthFFLauncher]: '0xd6b4F6b708572D34325fe18ee93AFFD76758C7c1',
};

export const LocalTokenAddress: Record<LocalTokenSymbol, `0x${string}`> = {
  [LocalTokenSymbol.ETH]: '0xdaC9Ed63dada8A7005ce2c69F8FF8bF6C272a3D0',
  [LocalTokenSymbol.RETH]: '0xF62f5dB01cb60d80219F478D5CDffB6398Cee9A5',
  [LocalTokenSymbol.PETH]: '0x294285577306bc14224510966DFb81002A5a3C6E',
  [LocalTokenSymbol.REY]: '0x645fC1E82a6732196B30C1e8b708267B887ABfCC',
  [LocalTokenSymbol.USDB]: '0x4200000000000000000000000000000000000022',
  [LocalTokenSymbol.RUSD]: '0xe04b19ed724A328C804e82e7196dcef18570bfae',
  [LocalTokenSymbol.PUSD]: '0x989bAD96A66b9e87899E26Be20fB6f32B7432bB3',
  [LocalTokenSymbol.RUY]: '0xA1DC1c7cA6B714A6Bd88de75AD367E8DaecabdDc',
};
