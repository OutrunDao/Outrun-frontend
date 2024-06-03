import { useRouter } from 'next/navigation';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useToast } from '@chakra-ui/react';
import { getRouterContract } from './getContract';
import { Percent } from '@/packages/swap-core';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { useRef, useState } from 'react';
import { retry } from 'radash';
import { Token } from '@/packages/swap-core';
import tokenSwitch, { CurrencyPairType } from './tokenSwitch';
import { Pair } from '@/packages/swap-sdk';

export default function useLiquidity() {
  const account = useAccount();
  const publicClient = usePublicClient();
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function addLiquidity(swapData: any) {
    if (!swapData.token0 || !swapData.token1 || !account.address || !walletClient) return;
    const slippage = 0.05;
    let execution = 'addLiquidity';
    let token0Input = parseUnits(swapData.token0AmountInput!, swapData.token0.decimals);
    let token1Input = parseUnits(swapData.token1AmountInput!, swapData.token1.decimals);
    let token0AmountMin = parseUnits(
      (+swapData.token0AmountInput! * slippage).toString(),
      swapData.token0.decimals
    );
    // 计算最小输出逻辑应该不对,待改
    let token1AmountMin = parseUnits(
      (+swapData.token1AmountInput! * slippage).toString(),
      swapData.token1.decimals
    );
    let deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    let to = account.address;
    let args: (string | number | bigint)[] = [
      (swapData.token0 as Token).address,
      (swapData.token1 as Token).address,
      token0Input,
      token1Input,
      token0AmountMin,
      token1AmountMin,
      to,
      deadline,
    ];
    let config;
    const [type, tokenA, tokenB, tokenAInput, tokenBInput, tokenAMin, tokenBMin] = tokenSwitch(
      swapData.token0,
      swapData.token1,
      token0Input,
      token1Input,
      token0AmountMin,
      token1AmountMin
    );
    // console.log(type, tokenA, tokenB, tokenAInput, tokenBInput, tokenAMin, tokenBMin);
    if (type === CurrencyPairType.EthAndUsdb) {
      execution = 'addLiquidityETHAndUSDB';
      args = [tokenBInput!, tokenAMin!, tokenBMin!, to, deadline];
      config = { value: tokenAInput, account };
    } else if (type === CurrencyPairType.EthAndToken) {
      execution = 'addLiquidityETH';
      args = [(tokenB as Token).address, tokenBInput!, tokenAMin!, tokenBMin!, to, deadline];
      config = { value: tokenAInput, account };
    } else if (type === CurrencyPairType.UsdbAndToken) {
      execution = 'addLiquidityUSDB';
      args = [(tokenB as Token).address, tokenBInput!, tokenAInput!, tokenBMin!, tokenAMin!, to, deadline];
    }
    setLoading(true)
    try {
      let toastCurrent = toast({
        status: 'loading',
        title: 'submiting transaction',
        description: 'please wait...',
        duration: null,
        isClosable: true,
      });
      const tx = await getRouterContract(walletClient!).write[execution](args, config);
      toast.update(toastCurrent, {
        title: 'transaction submitted',
        description: "Waiting for block confirmation",
        status: "loading"
      })
      const data = await retry({ times: 20, delay: 5000 }, async () => {
        return await publicClient!.getTransactionReceipt({
          hash: tx as Address,
        });
      });
      toast.update(toastCurrent, {
        status: data.status === 'success' ? "success" : "error",
        title: data.status === 'success' ? 'Add liquidity success' : 'Add liquidity fail',
        description: "",
        isClosable: true,

        duration: 10000
      })
      const pairAddress = Pair.getAddress(tokenA as Token, tokenB as Token)
      router.push('/pool/' + pairAddress)
    } catch (e: any) {
      toast.closeAll()
      toast({
        title: 'transaction failed',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false)
  }

  return {
    loading,
    addLiquidity
  }
}