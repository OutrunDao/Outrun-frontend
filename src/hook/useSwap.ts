import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { all, retry, set } from 'radash';
import { Native, Trade } from '@/packages/swap-sdk';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, maxUint256, parseUnits } from 'viem';
import { Token, Currency } from '@/packages/swap-core';
import { Pair } from '@/packages/swap-sdk';
import { getToken } from '@/components/TokenSelect';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import Decimal from 'decimal.js-light';
import { CurrencyAmount, Percent, V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import { TradeType } from '@/packages/swap-core';
import { USDB, RUSD } from '@/packages/swap-core';
import JSBI from 'jsbi';
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

async function exactInBestRoute(pair: Pair, amountIn: string) {
  // SwapRouter.swapCallParameters(bestRoutes, tradeOptions);
  const data = Trade.bestTradeExactIn(
    [pair],
    CurrencyAmount.fromRawAmount(
      pair.token0,
      new Decimal(amountIn!).times(10 ** pair.token0.decimals).toString()
    ),
    pair.token1
  );
  // console.log(data);
  // data.map((d) => {
  //   console.log(
  //     `${d.inputAmount.currency.symbol} ${d.outputAmount.currency.symbol} ${
  //       d.minimumAmountOut(new Percent(5, 100)).quotient
  //     }`
  //   );
  // });
}

export function useSwap(isSwap: SwapView) {
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
  const [tokenAllowance, setTokenAllowance] = useState<Decimal[]>([new Decimal(0), new Decimal(0)]);
  const [pair, setPair] = useState<Pair>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tradeRoute, setTradeRoute] = useState<Trade<Currency, Currency, TradeType>>()
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
  useEffect(() => {
    if (!token0 || !token1) {
      setPair(undefined);
      setTokenAllowance([new Decimal(0), new Decimal(0)]);
    } else {
      fetchPair();
      fetchAllowance();
    }
  }, [token0, token1]);

  useEffect(() => {
    if (!account.isConnected) return setAction(BtnAction.disconnect)
    if (!token0 || !token1 || !token0AmountInput || !token1AmountInput) return setAction(BtnAction.disable)
    if (+token0AmountInput === 0 || +token1AmountInput === 0) return setAction(BtnAction.disable)
    try {
      if (token0Balance.lt(token0AmountInput)) return setAction(BtnAction.insufficient)
      if (token1Balance.lt(token1AmountInput)) return setAction(BtnAction.insufficient)
    } catch (e) {
      return setAction(BtnAction.disable)
    }
    if (tokenAllowance[0].lessThan(token0AmountInput || 0) || tokenAllowance[1].lessThan(token1AmountInput || 0)) {
      return setAction(BtnAction.approve)
    }
    return setAction(BtnAction.available)
  }, [account])

  async function approve() {
    let tokenForApprove = tokenAllowance[0].lessThan(token0AmountInput || 0) ? token0 : token1!;
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
      await publicClient!.getTransactionReceipt({
        hash: tx as Address,
      });
      toast({
        title: 'Approve success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchAllowance();
    } catch (e: any) {
      toast({
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
    if (!pair || !token0 || isNaN(+value)) return;
    if (!isSwap) {
      const price = pair.priceOf(tokenConvert(token0));
      setToken1AmountInput((+price.toSignificant(6) * +value).toFixed(6));
    } else {
      const result = Trade.bestTradeExactIn(
        [pair],
        CurrencyAmount.fromRawAmount(
          tokenConvert(token0),
          JSBI.BigInt(+value * 10 ** token0.decimals)
        ),
        tokenConvert(token1!)
      );
      if (!result || !result.length) {
        console.log('未找到兑换路径，池子余额不够或不存在');
        return setToken1AmountInput('');
      }      // setToken1AmountInput(trade.outputAmount.toSignificant(6));
      setToken1AmountInput(result[0].outputAmount.toFixed(6));
      setTradeRoute(result[0])
    }
  }
  async function token1AmountInputHandler(value: string) {
    setToken1AmountInput(value);
    if (!pair || !token1 || isNaN(+value)) return;
    if (!isSwap) {
      const price = pair.priceOf(tokenConvert(token1));
      setToken0AmountInput((+price.toSignificant(6) * +value).toFixed(6));
    } else {

      const result = Trade.bestTradeExactOut(
        [pair],
        tokenConvert(token0),
        CurrencyAmount.fromRawAmount(
          tokenConvert(token1),
          JSBI.BigInt(+value * 10 ** token1.decimals)
          // JSBI.multiply(JSBI.BigInt(value), JSBI.BigInt(10 ** token1.decimals))
        )
      );
      if (!result || !result.length) {
        console.log('未找到兑换路径，池子余额不够或不存在');
        return setToken0AmountInput('');
      }
      setToken0AmountInput(result[0].inputAmount.toFixed(6));
      // setToken1AmountInput(result[0].minimumAmountOut(new Percent(5, 100)).toSignificant(6));
      // console.log(result[0].inputAmount, result[0].outputAmount)
      setTradeRoute(result[0])
    }
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
      action
    },
    loading,
    setLoading,
    setToken0,
    setToken1,
    setToken0AmountInput,
    setToken1AmountInput,
    approve,
    token0AmountInputHandler,
    token1AmountInputHandler,
  };
}
