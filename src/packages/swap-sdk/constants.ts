import { Percent, V2_FACTORY_ADDRESSES } from '@/packages/swap-core';
import JSBI from 'jsbi';

export const FACTORY_ADDRESS_MAP: { [chainId: number]: string } = V2_FACTORY_ADDRESSES;

// copy from \OutswapV1\src\libraries\OutswapV1Library.sol
export const INIT_CODE_HASH = '0x5fa9c12988c5dbb30e1f457fc8fa806d3118b38306a1480f8cf8f97334d3004a';

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const FIVE = JSBI.BigInt(5);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);
export const BASIS_POINTS = JSBI.BigInt(10000);

export const ZERO_PERCENT = new Percent(ZERO);
export const ONE_HUNDRED_PERCENT = new Percent(ONE);
