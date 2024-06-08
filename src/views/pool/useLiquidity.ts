import { useRouter } from 'next/navigation';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useToast } from '@chakra-ui/react';
import { Percent } from '@/packages/swap-core';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { useRef, useState } from 'react';
import { Token } from '@/packages/swap-core';
import tokenSwitch, { CurrencyPairType } from './tokenSwitch';
import { Pair } from '@/packages/swap-sdk';
import useContract from '@/hook/useContract';
import { ContractName } from '@/contracts/addressMap';
import Decimal from 'decimal.js-light';

export default function useLiquidity() {
  const account = useAccount();
  const { write: routerContractWrite } = useContract()
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function addLiquidity(swapData: any) {
    if (!swapData.token0 || !swapData.token1 || !account.address || !walletClient) return;
    const slippage = 0.95;
    let execution = 'addLiquidity';
    let token0Input = parseUnits(swapData.token0AmountInput!, swapData.token0.decimals);
    let token1Input = parseUnits(swapData.token1AmountInput!, swapData.token1.decimals);
    let token0AmountMin = BigInt(
      new Decimal(swapData.token0AmountInput).mul(slippage).times(new Decimal(10).pow(swapData.token0.decimals)).toString()
    )
    let token1AmountMin = BigInt(
      new Decimal(swapData.token1AmountInput).mul(slippage).times(new Decimal(10).pow(swapData.token1.decimals)).toString()
    )
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
    let config: any = { account };
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

    const data = await routerContractWrite(ContractName.SWAP_ROUTER, {
      actionTitle: "AddLiquidity"
      // @ts-ignore
    }, execution, args, config);
    if (data && data.status === 'success') {
      const pairAddress = Pair.getAddress(tokenA as Token, tokenB as Token)
      router.push('/pool/' + pairAddress)
    }

    setLoading(false)
  }

  return {
    loading,
    addLiquidity
  }
}