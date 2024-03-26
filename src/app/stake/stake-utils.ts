import { useBalance } from 'wagmi';
import { LocalTokenSymbol } from '@/types/index.d';
import { formatEther } from 'viem';
import { useReadContract, useAccount } from 'wagmi';
import { LocalTokenAddress } from '@/contants/address';
import { TokenABIMap } from '@/ABI';

export const useTokenBalance = (token: LocalTokenSymbol): string => {
  const account = useAccount().address;
  let balance = '0';
  if (!account) return balance;

  if (token === LocalTokenSymbol.ETH) {
    let { data, error, isPending } = useBalance({
      address: account,
    });

    if (!error && data && data.value) {
      balance = formatEther(data.value).slice(0, 6) || '0';
    }
  } else {
    let { data, error } = useReadContract({
      address: LocalTokenAddress[token],
      abi: TokenABIMap[token],
      functionName: 'balanceOf',
      args: [account],
    });

    if (error) {
      console.error('read balance error', error);
    }

    if (data) {
      balance = formatEther(data as bigint) || '0';
    }
  }

  return balance;
};
