import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { Text } from '@chakra-ui/react'
import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'

const ETHBalance = () => {
  const account = useAccount().address;  
  const { data } = useBalance({address: account,});
  const balance = formatEther(data?.value || 0n).slice(0, 6) || '0';
  
  store.setBalance(balance)
  
  return <Text>{balance}</Text>
}

export default observer(ETHBalance);