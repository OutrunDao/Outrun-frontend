import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { all, chain, debounce, map, retry, set } from 'radash';
import { Native, Trade } from '@/packages/swap-sdk';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, PublicClient, formatUnits, getAddress, maxUint256, parseUnits } from 'viem';
import { Token, Currency, TradeType } from '@/packages/swap-core';
import { Pair } from '@/packages/swap-sdk';
import { getToken } from '@/components/TokenSelect';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import Decimal from 'decimal.js-light';
import { CurrencyAmount, Percent } from '@/packages/swap-core';
import { USDB, RUSD } from '@/packages/swap-core';
import { LocalTokenAddress } from '@/contants/address';
import { addressMap } from '@/contracts/addressMap';
import getTokenContract from '@/contracts/get/erc20token';
import useContract from './useContract';
import { SUPPORTED_CHAINS } from '@/contracts/chains';
const defaultSymbol = 'ETH';

export enum BtnAction {
  disable,
  insufficient,
  disconnect,
  available,
  approve
}

export enum SwapView {
  swap,
  addLiquidity,
  createPoll
}


function tokenConvert(token: Currency): Token {
  if (token.equals(USDB[token.chainId])) return RUSD[token.chainId]
  return token.isNative ? Native.onChain(token.chainId).wrapped : (token as Token);
}

async function makePairs(tokenA: Currency, tokenB: Currency, publicClient: PublicClient): Promise<Pair[]> {
  const chainId = publicClient.chain!.id
  let pairs: Pair[] = []
  await map([
    [new Token(chainId, LocalTokenAddress.RETH, 18, 'orETH'), new Token(chainId, LocalTokenAddress.RUSD, 18, 'orUSD')],
  ], async rawPair => {
    let p = await Fetcher.fetchPairData(rawPair[0], rawPair[1], publicClient!).catch(() => null)
    if (p) pairs.push(p)
  })

  await map([
    new Token(chainId, LocalTokenAddress.RETH, 18, 'orETH'),
    new Token(chainId, LocalTokenAddress.RUSD, 18, 'orUSD')
  ], async token => {
    if (!tokenA.equals(token)) {
      let p1 = await Fetcher.fetchPairData(tokenConvert(tokenA), token, publicClient!).catch(() => null)
      if (p1) pairs.push(p1)
    }
    if (!tokenB.equals(token)) {
      let p2 = await Fetcher.fetchPairData(tokenConvert(tokenB), token, publicClient!).catch(() => null)
      if (p2) pairs.push(p2)
    }
  })
  return pairs
}

export function useSwap(view: SwapView) {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const [token0, setToken0] = useState<Currency>(getToken(defaultSymbol, chainId)!);
  const [token1, setToken1] = useState<Currency>();
  const [token0AmountInput, setToken0AmountInput] = useState<string>('');
  const [token1AmountInput, setToken1AmountInput] = useState<string>('');
  const [routeNotExist, setRouteNotExist] = useState<boolean>(false);
  const [slipage, setSlippage] = useState(2)
  const [token0Balance, setToken0Balance] = useState<Decimal>(new Decimal(0))
  const [token1Balance, setToken1Balance] = useState<Decimal>(new Decimal(0))
  const [pair, setPair] = useState<Pair>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tradeRoute, setTradeRoute] = useState<Trade<Currency, Currency, TradeType>>()
  const { write: writeContract } = useContract()
  const V2_ROUTER_ADDRESSES = useMemo(() => {
    return addressMap[chainId].SWAP_ROUTER
  }, [chainId])
  useEffect(() => {
    async function _() {
      if (!account.address || !token1 || !publicClient) return new Decimal(0);
      return token1.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _().then(setToken1Balance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account.address, token1?.name])

  useEffect(() => {
    async function _() {
      if (!account.address || !token0 || !publicClient) return new Decimal(0);
      return token0.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _().then(setToken0Balance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account.address, token0.name])
  useEffect(() => {
    async function _fn() {
      if (view === SwapView.swap || !token0 || !token1 || !publicClient) return;
      return await retry({ times: 2, delay: 3000 }, () =>
        Fetcher.fetchPairData(tokenConvert(token0), tokenConvert(token1), publicClient)
      ).catch((e) => undefined);
    }
    _fn().then(setPair)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, token0.name, token1?.name, view])
  useEffect(() => {
    setToken0AmountInput('')
    setToken1AmountInput('')
    setTradeRoute(undefined)
    setRouteNotExist(false)
  }, [token0.name, token1?.name]);

  const priceImpact = useMemo(() => {
    return tradeRoute && tradeRoute.priceImpact.toFixed()
  }, [tradeRoute])
  const exchangeRate = useMemo(() => {
    return tradeRoute && tradeRoute.executionPrice.toFixed()
  }, [tradeRoute])
  const minimalReceive = useMemo(() => {
    return tradeRoute && tradeRoute.minimumAmountOut(new Percent(slipage, 100)).toFixed(6)
  }, [tradeRoute, slipage])
  const tradeRoutePath = useMemo(() => {
    return tradeRoute && tradeRoute.route.path.map((token, index) => {
      if (index === 0) return token0.symbol
      if (index === tradeRoute.route.path.length - 1) return token1!.symbol
      return token.symbol
    }).join(' -> ')
  }, [tradeRoute, token0, token1])


  const submitButtonStatus = useMemo(() => {
    if (!chainId || !SUPPORTED_CHAINS.includes(chainId)) return BtnAction.disconnect;
    if (!token0 || !token1 || !token0AmountInput || !token1AmountInput) {
      return BtnAction.disable;
    }
    try {
      if (view === SwapView.swap) {
        if (!tradeRoute) return BtnAction.disable
        if (priceImpact && +priceImpact >= 20) return BtnAction.disable
        if (tradeRoute.tradeType === TradeType.EXACT_INPUT && token0Balance.lt(token0AmountInput)) return BtnAction.insufficient
        if (tradeRoute.tradeType === TradeType.EXACT_OUTPUT && token1Balance.lt(token1AmountInput)) return BtnAction.insufficient
      } else {
        if (token0Balance.lt(token0AmountInput) || token1Balance.lt(token1AmountInput)) return BtnAction.insufficient
      }
    } catch (e) {
      console.log(e);

      return BtnAction.disable
    }

    return BtnAction.available
  }, [chainId, token0, token1, token0Balance, token1Balance, token0AmountInput, token1AmountInput, tradeRoute, view, priceImpact])



  async function approveTokens() {
    if (!account.address) return console.log('wallet account is not connected');
    if (!token0 || !token1) return;
    setLoading(true);
    try {

      if (!token0.isNative) {
        const allowanceToken0 = await (token0 as Token).allowance(account.address, getAddress(V2_ROUTER_ADDRESSES), publicClient!)
        if (allowanceToken0.lessThan(token0AmountInput || 0)) {
          // @ts-ignore
          await writeContract(getTokenContract((token0 as Token).address, publicClient!, walletClient), {
            actionTitle: "Approve Token " + token0.symbol
          }, 'approve', [V2_ROUTER_ADDRESSES, parseUnits(
            token0AmountInput!.toString(),
            token0.decimals
          )], {
            account
          })
        }
      }

      if (view !== SwapView.swap) {
        // check token1
        if (!token1.isNative) {
          const allowanceToken1 = await (token1 as Token).allowance(account.address, getAddress(V2_ROUTER_ADDRESSES), publicClient!)
          if (allowanceToken1.lessThan(token1AmountInput || 0)) {
            // @ts-ignore
            await writeContract(getTokenContract((token1 as Token).address, publicClient!, walletClient), {
              actionTitle: "Approve Token " + token1.symbol
            }, 'approve', [V2_ROUTER_ADDRESSES, parseUnits(
              token1AmountInput!.toString(),
              token1.decimals
            )], {
              account
            })
          }
        }
      }
    } catch (e) {

    }
    setLoading(false);
  }

  async function setSwapDataWhenInput(tradeType: TradeType, value: string) {
    setRouteNotExist(false)
    if (view === SwapView.addLiquidity) {
      if (pair) {
        const price = pair.priceOf(tokenConvert(tradeType === TradeType.EXACT_INPUT ? token0! : token1!));
        tradeType === TradeType.EXACT_INPUT ?
          setToken1AmountInput((+price.toSignificant(6) * +value).toFixed(6)) :
          setToken0AmountInput((+price.toSignificant(6) * +value).toFixed(6));
      }
      return
    }
    if (view === SwapView.swap) {
      if (!publicClient) return;
      if (tradeType === TradeType.EXACT_INPUT) {
        const result = Trade.bestTradeExactIn(
          await makePairs(token0, token1!, publicClient),
          CurrencyAmount.fromRawAmount(
            tokenConvert(token0),
            parseUnits(value, token0.decimals).toString()
          ),
          tokenConvert(token1!), { maxNumResults: 1 }
        );
        if (!result || !result.length) {
          setTradeRoute(undefined)
          setRouteNotExist(true)
          return setToken1AmountInput('');
        }
        setToken1AmountInput(result[0].outputAmount.toFixed(8));
        setTradeRoute(result[0])
      } else {
        const result = Trade.bestTradeExactOut(
          await makePairs(token0, token1!, publicClient!),
          tokenConvert(token0),
          CurrencyAmount.fromRawAmount(
            tokenConvert(token1!),
            parseUnits(value, token1!.decimals).toString()
          ), {
          maxNumResults: 1
        }
        );
        if (!result || !result.length) {
          setTradeRoute(undefined)
          setRouteNotExist(true)
          return setToken0AmountInput('');
        }
        setToken0AmountInput(result[0].inputAmount.toFixed(8));
        setTradeRoute(result[0])
      }
    }

  }
  const debouncedSetSwapDataWhenInput = debounce({ delay: 500 }, setSwapDataWhenInput)

  async function token0AmountInputHandler(value: string) {
    setToken0AmountInput(value);
    setToken1AmountInput('');
    if (!value || !token0 || isNaN(+value) || +value <= 0) return;
    if (!token1 || !publicClient) return;
    debouncedSetSwapDataWhenInput.cancel();
    debouncedSetSwapDataWhenInput(TradeType.EXACT_INPUT, value);
  }
  async function token1AmountInputHandler(value: string) {
    setToken1AmountInput(value);
    if (!value || !token1 || isNaN(+value)) return;
    if (!token0 || !publicClient) return;
    debouncedSetSwapDataWhenInput.cancel();
    debouncedSetSwapDataWhenInput(TradeType.EXACT_OUTPUT, value);
  }

  async function maxHandler(flag: number) {
    if (flag === 0) {
      return token0AmountInputHandler(token0Balance.toString())
    }
    return token1AmountInputHandler(token1Balance.toString())
  }

  return {
    swapData: {
      token0,
      token1,
      token0Balance,
      token1Balance,
      token0AmountInput,
      token1AmountInput,
      pair,
      tradeRoute,
      tradeRoutePath,
      minimalReceive,
      submitButtonStatus,
      priceImpact,
      routeNotExist,
      exchangeRate
    },
    loading,
    setLoading,
    setToken0,
    setToken1,
    setToken0AmountInput,
    setToken1AmountInput,
    setSlippage,
    approveTokens,
    token0AmountInputHandler,
    token1AmountInputHandler,
    maxHandler
  };
}
