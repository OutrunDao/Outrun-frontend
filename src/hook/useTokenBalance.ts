import { Account, formatUnits, getAddress } from 'viem';
import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { TokenInfo } from '@uniswap/token-lists';
import Decimal from 'decimal.js-light';
export default function useTokenBalance(
  account: Account,
  token: TokenInfo
): { balance: string; loading: boolean } {
  const publicClient = usePublicClient({ chainId: token.chainId });
  const [tokenBalance, setBalance] = useState<{ balance: string; loading: boolean }>({
    balance: '0',
    loading: false,
  });
  useEffect(() => {
    if (!publicClient || !account.address) return;
    publicClient
      ?.readContract({
        address: getAddress(token.address),
        abi: [
          {
            constant: true,
            inputs: [{ name: '', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'balanceOf',
        args: [account.address],
      })
      .then((balance: bigint) => {
        setBalance({ balance: new Decimal(formatUnits(balance, token.decimals)).toFixed(6), loading: false });
      });
  }, [token, publicClient, account]);

  return tokenBalance;
}
