import { useWriteContract, useChainId, useConfig } from 'wagmi';

import { V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import { getAddress, Address, parseUnits } from 'viem';
import { routerAbi } from './abi';
import { TokenInfo } from '@uniswap/token-lists';
import Big from 'big.js';
import { useEffect, useState } from 'react';
import { waitForTransactionReceipt } from '@wagmi/core';

export function useLiquidity(
  tokenA: TokenInfo | undefined,
  tokenB: TokenInfo | undefined,
  amountA: string,
  amountB: string,
  to: Address | undefined
) {
  const { data: tx, writeContract, status: txStatus, error } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const chainId = useChainId();
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
  const slippage = 0.05;
  const config = useConfig();
  function addLiquidity() {
    if (!tokenA || !tokenB) {
      return;
    }
    writeContract({
      address: getAddress(V2_ROUTER_ADDRESSES[chainId]),
      abi: routerAbi,
      functionName: 'addLiquidity',
      args: [
        tokenA.address,
        tokenB.address,
        parseUnits(amountA, 18),
        parseUnits(amountB, 18),
        parseUnits(new Big(amountA).mul(1 - slippage).toString(), 18),
        parseUnits(new Big(amountB).mul(1 - slippage).toString(), 18),
        to,
        deadline,
      ],
    });
  }

  useEffect(() => {
    if (txStatus === 'pending') {
      setLoading(true);
    }
    if (txStatus === 'error') {
      setLoading(false);
      console.log(error);
    }
    if (txStatus === 'success') {
      waitForTransactionReceipt(config, {
        hash: tx!,
      }).then((res) => {
        console.log(res);
        setLoading(false);
      });
    }
  }, [txStatus, tx, error, config]);

  return { loading, addLiquidity };
}
