import { abi, address } from '@/contracts/SwapFactory';
import { useReadContract, useWriteContract, useConfig } from 'wagmi';
import { readContract } from '@wagmi/core';
import { useEffect, useState } from 'react';

export function useGetPair(tokenA: string, tokenB: string) {
  const config = useConfig();
  const [pair, setPair] = useState<string>('');
  useEffect(() => {
    readContract(config, {
      abi,
      address,
      functionName: 'getPair',
      args: [tokenA, tokenB].sort(),
    }).then((result) => {
      console.log('pair:', result);
      setPair(result as string);
    });
  });
  return pair;
}
