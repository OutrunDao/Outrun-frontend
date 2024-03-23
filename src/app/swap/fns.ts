import { TokenInfo } from '@uniswap/token-lists';
import { Token } from '@/packages/swap-core';
import { CurrencyAmount } from '@/packages/swap-core';

export function toToken(tokenInfo: TokenInfo): Token {
  // TODO: if is eth than return NativeCurrency type
  return new Token(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol);
}

export function toCurrencyAmount(tokenInfo: TokenInfo, rawAmount: string) {
  return CurrencyAmount.fromRawAmount(toToken(tokenInfo), rawAmount);
}
