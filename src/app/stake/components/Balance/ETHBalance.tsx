import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { Text } from '@chakra-ui/react'

const ETHBalance = () => {
  const account = useAccount().address;  
  const { data } = useBalance({address: account,});
  const balance = formatEther(data?.value || 0n).slice(0, 6) || '0';

  return <Text>{balance}</Text>
}

export default ETHBalance;