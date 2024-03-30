import { Currency } from '@/packages/swap-core';
import { Native } from '@/packages/swap-sdk';
import { Token } from '@/packages/swap-core';
import { tokenList } from '@/tokens/list';

function isTokenIsUSDB(token: Currency) {
  if (token.isNative) return false;
  if (token.symbol !== 'USDB') return false;
  let index = tokenList.tokens.findIndex(
    (i) => i.chainId === token.chainId && token.address === i.address && i.symbol === 'USDB'
  );
  return index >= 0;
}

export enum CurrencyPairType {
  TokenAndToken,
  EthAndToken,
  EthAndUsdb,
  UsdbAndToken,
}
export default function tokenSwitch(
  tokenA: Currency,
  tokenB: Currency,
  tokenAInput: bigint,
  tokenBInput: bigint,
  tokenAMin: bigint,
  tokenBMin: bigint
): [CurrencyPairType, Currency, Currency, bigint, bigint, bigint, bigint] {
  if ((tokenA.isNative && isTokenIsUSDB(tokenB)) || (tokenB.isNative && isTokenIsUSDB(tokenA))) {
    return tokenA.isNative
      ? [CurrencyPairType.EthAndUsdb, tokenA, tokenB, tokenAInput, tokenBInput, tokenAMin, tokenBMin]
      : [CurrencyPairType.EthAndUsdb, tokenB, tokenA, tokenBInput, tokenAInput, tokenBMin, tokenAMin];
  }
  if (tokenA.isNative || tokenB.isNative) {
    return tokenA.isNative
      ? [
          CurrencyPairType.EthAndToken,
          tokenA,
          tokenB as Token,
          tokenAInput,
          tokenBInput,
          tokenAMin,
          tokenBMin,
        ]
      : [
          CurrencyPairType.EthAndToken,
          tokenB,
          tokenA as Token,
          tokenBInput,
          tokenAInput,
          tokenBMin,
          tokenAMin,
        ];
  }
  if (isTokenIsUSDB(tokenA) || isTokenIsUSDB(tokenB)) {
    return isTokenIsUSDB(tokenA)
      ? [CurrencyPairType.UsdbAndToken, tokenA, tokenB, tokenAInput, tokenBInput, tokenAMin, tokenBMin]
      : [CurrencyPairType.UsdbAndToken, tokenB, tokenA, tokenBInput, tokenAInput, tokenBMin, tokenAMin];
  }
  return [CurrencyPairType.TokenAndToken, tokenA, tokenB, tokenAInput, tokenBInput, tokenAMin, tokenBMin];
}
