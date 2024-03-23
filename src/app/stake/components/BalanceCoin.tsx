import { Text, Flex, Box, Button } from '@chakra-ui/react'
import { useReadContract } from 'wagmi'
import { TokenABIMap } from '@/ABI'
import { formatUnits, formatEther } from 'viem'
import { LocalTokenAddress } from '@/contants/address'
import { LocalTokenSymbol } from '@/types/index.d';
import { useBalance, useAccount, useAccountEffect, type UseBalanceParameters, type UseAccountEffectParameters } from 'wagmi'

interface IProps {
  coinSymbol: LocalTokenSymbol
  balance: string,
  account: `0x${string}` | undefined,
  isConnected: boolean,
  setMintValue: (val: string) => void,
}

const BalanceCoin = (props: IProps) => {
  const { isConnected, account, coinSymbol } = props  
  let balance = '0'
  let pending = false
  if (coinSymbol === LocalTokenSymbol.ETH) {
    let { data, error, isPending } = useBalance({
      address: account,
    })
    pending = isPending
    if (!error && data && data.value) {
      balance = formatEther(data.value).slice(0, 6) || '0'
    }
  } else {
    let { data, error, isPending } = useReadContract({
      address: LocalTokenAddress[coinSymbol],
      abi: TokenABIMap[coinSymbol],
      functionName: 'balanceOf',
      args: [account],
    })
    pending = isPending  
      console.log('data', data);
      
    if (!error && data) {
      balance = formatEther(data) || '0'
    }

  }

  console.log('balance', balance);

  if (pending) {
    return <Box>loading...</Box>
  }

  return (
    <Flex justifyContent="flex-end" marginTop="12px">
      {/* <Text color="#999" fontSize="14px">$12.99</Text> */}
      <Box color="#999" fontSize="14px">
        Balance: {balance}
        <Button 
          isDisabled={!isConnected}
          onClick={() => {props.setMintValue(balance);}}
          marginLeft="12px" colorScheme='teal' size='xs'>Max</Button>
      </Box>
    </Flex>
  )
}

export default BalanceCoin