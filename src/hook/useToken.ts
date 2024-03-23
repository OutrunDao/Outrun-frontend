import { Account, Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { TokenInfo } from '@uniswap/token-lists';
import Decimal from 'decimal.js-light';
import { useWriteContract } from 'wagmi';

import { erc20ABI } from '@/packages/swap-sdk/abis/ERC20';

export default function useToken(token: TokenInfo | undefined) {
  const publicClient = usePublicClient({ chainId: token && token.chainId });
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [allowance, setAllowance] = useState<bigint>(0n);
  const { writeContractAsync } = useWriteContract();

  function fetchBalance(userAddress: Address) {
    if (!token) {
      return;
    }
    publicClient
      ?.readContract({
        address: getAddress(token.address),
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [userAddress],
      })
      .then((balance: bigint) => {
        setBalance(new Decimal(formatUnits(balance, token.decimals)).toFixed(6));
      });
  }

  function fetchAllowance(owner: Address, spender: Address) {
    if (!token) {
      return;
    }
    publicClient
      ?.readContract({
        address: getAddress(token.address),
        abi: erc20ABI,
        functionName: 'allowance',
        args: [owner, spender],
      })
      .then((allowance: bigint) => {
        setAllowance(allowance);
      });
  }

  function approve(spender: Address, value: string) {
    if (!token) {
      return;
    }
    writeContractAsync({
      address: getAddress(token.address),
      abi: erc20ABI,
      functionName: 'approve',
      args: [spender, parseUnits(value, token.decimals)],
    }).then((tx) => {
      console.log(tx);
    });
  }

  return { balance, loading, allowance, fetchBalance, fetchAllowance, approve };
}
