import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { all, map, retry, set } from 'radash';
import { Native, Trade } from '@/packages/swap-sdk';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, PublicClient, formatUnits, getAddress, maxUint256, parseUnits } from 'viem';
import { Token, Currency } from '@/packages/swap-core';
import { Pair } from '@/packages/swap-sdk';
import { getToken } from '@/components/TokenSelect';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import Decimal from 'decimal.js-light';
import { CurrencyAmount, Percent, V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import { TradeType } from '@/packages/swap-core';
import { USDB, RUSD } from '@/packages/swap-core';
import { LocalTokenAddress } from '@/contants/address';

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
  const [token0Balance, setToken0Balance] = useState<Decimal>(new Decimal(0));
  const [token1Balance, setToken1Balance] = useState<Decimal>(new Decimal(0));
  const [token0AmountInput, setToken0AmountInput] = useState<string>('');
  const [token1AmountInput, setToken1AmountInput] = useState<string>('');
  const [priceImpact, setPriceImpact] = useState('')
  const [exchangeRate, setExchangeRate] = useState('')
  const [slipage, setSlippage] = useState(2)
  const [minOut, setMinOut] = useState('')
  const [tokenAllowance, setTokenAllowance] = useState<Decimal[]>([new Decimal(0), new Decimal(0)]);
  const [pair, setPair] = useState<Pair>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tradeRoute, setTradeRoute] = useState<Trade<Currency, Currency, TradeType>>()
  const [tradeRoutePath, setTradeRoutePath] = useState('')
  const [action, setAction] = useState<BtnAction>(BtnAction.disable)
  const toast = useToast();

  const fetchAllowance = async () => {
    if (!account.address || !token0 || !token1) return;
    const allowance0 = token0.isNative
      ? new Decimal(9999999)
      : await (token0 as Token)
        .allowance(account.address, getAddress(V2_ROUTER_ADDRESSES[chainId]), publicClient!)
        .catch(() => new Decimal(0));
    const allowance1 = token1.isNative
      ? new Decimal(9999999)
      : await (token1 as Token)
        .allowance(account.address, getAddress(V2_ROUTER_ADDRESSES[chainId]), publicClient!)
        .catch(() => new Decimal(0));
    setTokenAllowance([allowance0, allowance1]);
  };
  const fetchPair = async () => {
    const pair = await retry({ times: 2, delay: 3000 }, () =>
      Fetcher.fetchPairData(tokenConvert(token0), tokenConvert(token1!), publicClient!)
    ).catch((e) => undefined);
    setPair(pair);
  };
  // watch and update balance
  useEffect(() => {
    const fetchBalance = async () => {
      const balance0 =
        !account.address || !token0
          ? new Decimal(0)
          : await token0.balanceOf(account.address, publicClient!).catch(() => new Decimal(0));
      const balance1 =
        !account.address || !token1
          ? new Decimal(0)
          : await token1.balanceOf(account.address, publicClient!).catch(() => new Decimal(0));
      setToken0Balance(balance0);
      setToken1Balance(balance1);
    };
    fetchBalance();
  }, [token0, token1, account.address]);

  // watch and update pair
  useEffect(() => {
    setToken0AmountInput('')
    setToken1AmountInput('')
    resetData()
    if (!token0 || !token1) {
      setPair(undefined);
      setTokenAllowance([new Decimal(0), new Decimal(0)]);
    } else {
      fetchPair();
      fetchAllowance();
    }
  }, [token0, token1]);

  // watch and update available action
  useEffect(() => {
    if (!account.isConnected) return setAction(BtnAction.disconnect)
    if (!token0 || !token1 || !token0AmountInput || !token1AmountInput) return setAction(BtnAction.disable)
    if (+token0AmountInput === 0 || +token1AmountInput === 0) return setAction(BtnAction.disable)
    if (priceImpact && +priceImpact >= 20) return setAction(BtnAction.disable)
    try {
      if (view === SwapView.swap) {
        if (tradeRoute?.tradeType === TradeType.EXACT_INPUT && token0Balance.lt(token0AmountInput)) return setAction(BtnAction.insufficient)
        if (tradeRoute?.tradeType === TradeType.EXACT_OUTPUT && token1Balance.lt(token1AmountInput)) return setAction(BtnAction.insufficient)
      } else {
        if (token0Balance.lt(token0AmountInput)) return setAction(BtnAction.insufficient)
        if (token1Balance.lt(token1AmountInput)) return setAction(BtnAction.insufficient)
      }
    } catch (e) {
      return setAction(BtnAction.disable)
    }
    if (view === SwapView.swap) {
      if (tokenAllowance[0].lessThan(token0AmountInput || 0)) {
        return setAction(BtnAction.approve)
      }
    } else {
      if ((tokenAllowance[0].lessThan(token0AmountInput || 0)) || tokenAllowance[1].lessThan(token1AmountInput || 0)) {
        return setAction(BtnAction.approve)
      }
    }

    return setAction(BtnAction.available)
  }, [account, tradeRoute, priceImpact])

  useEffect(() => {
    if (tradeRoute?.tradeType === TradeType.EXACT_INPUT) {
      token0AmountInputHandler(token0AmountInput)

    }
    if (tradeRoute?.tradeType === TradeType.EXACT_OUTPUT) {
      token1AmountInputHandler(token1AmountInput)
    }
  }, [slipage])

  async function approve() {
    let tokenForApprove = tokenAllowance[0].lessThan(token0AmountInput || 0) ? token0 : token1!;
    let toastCurrent = toast({
      status: 'loading',
      title: 'submiting approve transaction',
      description: 'please wait...',
      duration: null,
      isClosable: true,
    });
    setLoading(true);
    try {
      if (tokenForApprove.isNative) return;
      const tx = await tokenForApprove.approve(
        getAddress(V2_ROUTER_ADDRESSES[chainId]),
        // maxUint256,
        parseUnits(
          tokenForApprove.equals(token0) ? token0AmountInput!.toString() : token1AmountInput!.toString(),
          tokenForApprove.decimals
        ),
        walletClient!
      );
      const result = await retry({
        times: 20,
        delay: 5000
      }, async () => {
        return await publicClient!.getTransactionReceipt({
          hash: tx as Address
        })
      })
      if (result.status === "success") {
        fetchAllowance();
      }
      toast.update(toastCurrent, {
        title: result.status === "success" ? 'Approve success' : "Approve failed",
        status: result.status === 'success' ? 'success' : "error",
        duration: 3000,
      })
    } catch (e: any) {
      toast.update(toastCurrent, {
        title: 'Approve failed',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  async function token0AmountInputHandler(value: string) {
    setToken0AmountInput(value);
    setToken1AmountInput('');
    if (!value || !pair || !token0 || isNaN(+value) || +value <= 0) return;
    if (view === SwapView.addLiquidity) {
      const price = pair.priceOf(tokenConvert(token0));
      setToken1AmountInput((+price.toSignificant(6) * +value).toFixed(6));
    } else if (view === SwapView.swap) {
      const result = Trade.bestTradeExactIn(
        await makePairs(token0, token1!, publicClient!),
        CurrencyAmount.fromRawAmount(
          tokenConvert(token0),
          parseUnits(value, token0.decimals).toString()
          // JSBI.BigInt(+value * 10 ** token0.decimals)
        ),
        tokenConvert(token1!), { maxNumResults: 1 }
      );

      if (!result || !result.length) {
        // console.log('池子余额不够或不存在');
        resetData()
        return setToken1AmountInput('');
      }      // setToken1AmountInput(trade.outputAmount.toSignificant(6));
      setPriceImpact(result[0].priceImpact.toFixed())
      setToken1AmountInput(result[0].outputAmount.toFixed(8));
      setTradeRoute(result[0])
      // const tradeRoute = result[0]
      setExchangeRate(result[0].executionPrice.toFixed())
      setMinOut(result[0].minimumAmountOut(new Percent(slipage, 100)).toFixed(6))
      let path = result.map(item => {
        return item.route.path.map(i => i.symbol).join('->')
      })
      setTradeRoutePath(path.join('->'))
    }
  }
  async function token1AmountInputHandler(value: string) {
    setToken1AmountInput(value);
    if (!value || !pair || !token1 || isNaN(+value)) return;
    if (view === SwapView.addLiquidity) {
      const price = pair.priceOf(tokenConvert(token1));
      setToken0AmountInput((+price.toSignificant(6) * +value).toFixed(6));
    } else if (view === SwapView.swap) {

      const result = Trade.bestTradeExactOut(
        await makePairs(token0, token1!, publicClient!),
        tokenConvert(token0),
        CurrencyAmount.fromRawAmount(
          tokenConvert(token1),
          parseUnits(value, token1.decimals).toString()
        ), {
        maxNumResults: 1
      }
      );
      // console.log(result);

      if (!result || !result.length) {
        // console.log('未找到兑换路径，池子余额不够或不存在');
        resetData()
        return setToken0AmountInput('');
      }
      setExchangeRate(result[0].executionPrice.toFixed())
      setPriceImpact(result[0].priceImpact.toFixed())
      setToken0AmountInput(result[0].inputAmount.toFixed(8));
      setMinOut(result[0].minimumAmountOut(new Percent(slipage, 100)).toFixed(6))
      // setToken1AmountInput(result[0].minimumAmountOut(new Percent(5, 100)).toSignificant(6));
      setTradeRoute(result[0])
      let path = result.map(item => {
        return item.route.path.map(i => i.symbol).join('->')
      })
      setTradeRoutePath(path.join('->'))
    }
  }

  function resetData() {
    setPriceImpact('')
    setTradeRoutePath('')
    setExchangeRate('')
    setMinOut('')
    setTradeRoute(undefined)
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
      tokenAllowance,
      pair,
      tradeRoute,
      tradeRoutePath,
      minOut,
      action,
      priceImpact,
      exchangeRate
    },
    loading,
    setLoading,
    setToken0,
    setToken1,
    setToken0AmountInput,
    setToken1AmountInput,
    setSlippage,
    approve,
    token0AmountInputHandler,
    token1AmountInputHandler,
    maxHandler
  };
}
