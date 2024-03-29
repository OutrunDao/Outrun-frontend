import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { all, retry, set } from 'radash';
import { Trade } from '@/packages/swap-sdk';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { Token } from '@/packages/swap-core';
import { Pair } from '@/packages/swap-sdk';
import { getToken } from '@/components/TokenSelect';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import Decimal from 'decimal.js-light';
const defaultSymbol = 'WETH';

export function useSwap() {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const [token0, setToken0] = useState<Token>(getToken(defaultSymbol, chainId)!);
  const [token1, setToken1] = useState<Token>();
  const [token0Balance, setToken0Balance] = useState<Decimal>(new Decimal(0));
  const [token1Balance, setToken1Balance] = useState<Decimal>(new Decimal(0));
  const [token0AmountInput, setToken0AmountInput] = useState<string>();
  const [token1AmountInput, setToken1AmountInput] = useState<string>();
  const [tokenAllowance, setTokenAllowance] = useState<Decimal[]>([new Decimal(0), new Decimal(0)]);
  const [pair, setPair] = useState<Pair>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const fetchAllowance = async () => {
    if (!account.address || !token0 || !token1) return;
    const allowance0 = await token0
      .allowance(account.address, getAddress(V2_ROUTER_ADDRESSES[chainId]), publicClient!)
      .catch(() => new Decimal(0));
    const allowance1 = await token1
      .allowance(account.address, getAddress(V2_ROUTER_ADDRESSES[chainId]), publicClient!)
      .catch(() => new Decimal(0));
    setTokenAllowance([allowance0, allowance1]);
  };
  const fetchPair = async () => {
    const pair = await retry({ times: 2, delay: 3000 }, () =>
      Fetcher.fetchPairData(token0, token1!, publicClient!)
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

  async function approve() {
    let tokenForApprove = tokenAllowance[0].lessThan(token0AmountInput || 0) ? token0 : token1!;
    setLoading(true);
    try {
      const tx = await tokenForApprove.approve(
        getAddress(V2_ROUTER_ADDRESSES[chainId]),
        parseUnits(
          tokenForApprove.equals(token0) ? token0AmountInput!.toString() : token1AmountInput!.toString(),
          tokenForApprove.decimals
        ),
        walletClient!
      );
      await publicClient!.waitForTransactionReceipt({
        hash: tx as Address,
      });
      toast({
        title: 'Approve success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchAllowance();
    } catch (e) {
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
    const price = pair.priceOf(token0);

    setToken1AmountInput((+price.toSignificant(6) * +value).toFixed(6));
  }
  async function token1AmountInputHandler(value: string) {
    setToken1AmountInput(value);
    if (!pair || !token1 || isNaN(+value)) return;
    const price = pair.priceOf(token1);
    setToken0AmountInput((+price.toSignificant(6) * +value).toFixed(6));
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
