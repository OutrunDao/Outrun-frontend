import { useReadContract, useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { LocalTokenAddress } from '@/contants/address';
import { Text } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'


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

const TokenBalance = () => {
  const account = useAccount().address || 0n;
  const { data = 0n } = useReadContract({
    address: LocalTokenAddress[store.selectedToken],
    abi: ABI,
    functionName: 'balanceOf',
    args: [account],
  });
  
  if (!data) return <Text>0</Text>
  
  const balance = formatEther(data as bigint)
  store.setBalance(balance)

  return <Text>{balance}</Text>
}

export default observer(TokenBalance)