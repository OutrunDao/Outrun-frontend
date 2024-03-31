import { useReadContract, useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { LocalTokenAddress } from '@/contants/address';
import { TokenABIMap } from '@/ABI';
import { Text } from '@chakra-ui/react'
import { LocalTokenSymbol } from '@/types/index.d';

interface IProps{
  selectedToken: LocalTokenSymbol
}

const ABI = [{
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  }
]

const TokenBalance = (props: IProps) => {
  const { selectedToken } = props
  const account = useAccount().address || 0n;  

  let { data } = useReadContract({
    address: LocalTokenAddress[selectedToken],
    abi: ABI,
    functionName: 'balanceOf',
    args: [account],
  });
  
  if (!data) return <Text>0</Text>

  return <Text>{formatEther(data as bigint)}</Text>
}

export default TokenBalance