import { TokenList } from '@uniswap/token-lists';
//https://raw.githubusercontent.com/viaprotocol/tokenlists/main/all_tokens/all.json
import { zeroAddress } from 'viem';
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
      address: '0x4200000000000000000000000000000000000023',
      chainId: 168587773,
      name: 'Wrapped Ether',
      symbol: 'WETH',
      logoURI:
        'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
      decimals: 18,
    },
    {
      address: '0x4200000000000000000000000000000000000022', //'0x4300000000000000000000000000000000000003',
      chainId: 168587773,
      name: 'USDB Coin',
      symbol: 'USDB',
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
      decimals: 18,
    },
    {
      chainId: 168587773,
      address: '0xF62f5dB01cb60d80219F478D5CDffB6398Cee9A5',
      name: 'ORETH',
      symbol: 'ORETH',
      decimals: 18,
      logoURI: '',
    },
    {
      chainId: 168587773,
      address: '0x294285577306bc14224510966DFb81002A5a3C6E',
      name: 'OSETH',
      symbol: 'OSETH',
      decimals: 18,
      logoURI: '',
    },
    {
      chainId: 168587773,
      address: '0x645fC1E82a6732196B30C1e8b708267B887ABfCC',
      name: 'REY',
      symbol: 'REY',
      decimals: 18,
      logoURI: '',
    },
    {
      chainId: 168587773,
      address: '0xe04b19ed724A328C804e82e7196dcef18570bfae',
      name: 'ORUSD',
      symbol: 'ORUSD',
      decimals: 18,
      logoURI: '',
    },
    {
      chainId: 168587773,
      address: '0x989bAD96A66b9e87899E26Be20fB6f32B7432bB3',
      name: 'OSUSD',
      symbol: 'OSUSD',
      decimals: 18,
      logoURI: '',
    },
    {
      chainId: 168587773,
      address: '0xA1DC1c7cA6B714A6Bd88de75AD367E8DaecabdDc',
      name: 'RUY',
      symbol: 'RUY',
      decimals: 18,
      logoURI: '',
    },
    // {
    //   chainId: 1,
    //   address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    //   name: 'Dai Stablecoin',
    //   symbol: 'DAI',
    //   decimals: 18,
    //   logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
    // },
    // {
    //   address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    //   chainId: 1,
    //   name: 'USD Coin',
    //   symbol: 'USDC',
    //   logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
    //   decimals: 6,
    // },
    // {
    //   address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    //   chainId: 1,
    //   name: 'Tether USD',
    //   symbol: 'USDT',
    //   logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663',
    //   decimals: 6,
    // },
  ],
};

export function getToken(tokenSymbol: string) {
  return tokenList.tokens.find((token) => token.symbol === tokenSymbol);
}
