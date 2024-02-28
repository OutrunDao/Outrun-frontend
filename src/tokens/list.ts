import { TokenList } from '@uniswap/token-lists';
//https://raw.githubusercontent.com/viaprotocol/tokenlists/main/all_tokens/all.json
export const tokenList: TokenList = {
  name: 'Outrun Default List',
  timestamp: '2024-02-28T00:00:00.000Z',
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tokens: [
    {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainId: 1,
      name: 'Wrapped Ether',
      symbol: 'WETH',
      logoURI:
        'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
      decimals: 18,
    },
    {
      chainId: 1,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
    },
    {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      chainId: 1,
      name: 'USD Coin',
      symbol: 'USDC',
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
      decimals: 6,
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      chainId: 1,
      name: 'Tether USD',
      symbol: 'USDT',
      logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663',
      decimals: 6,
    },
  ],
};

export function getToken(tokenSymbol: string) {
  return tokenList.tokens.find((token) => token.symbol === tokenSymbol);
}
