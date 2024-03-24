import { use, useMemo } from 'react';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
export default function TokenSymbol({ address }: { address: Address }) {
  const { data, isLoading, error } = useReadContract({
    abi: [
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address,
    functionName: 'symbol',
  });
  // console.log(data, error);

  return <>{data || address}</>;
}
export function TokenBalance({ address, account }: { address: Address; account: Address }) {
  const { data, isLoading, error } = useReadContract({
    abi: [
      {
        type: 'function',
        name: 'totalSupply',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
      },
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
    address,
    // args: [account],
    functionName: 'totalSupply',
  });

  console.log(data && formatUnits(data, 18));

  return <>{(data && formatUnits(data, 18)) || 0}</>;
}
