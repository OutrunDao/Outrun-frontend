import { Text, Flex, Box, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { formatUnits, formatEther } from 'viem'
import { useBalance, useAccount, useAccountEffect, type UseBalanceParameters, type UseAccountEffectParameters } from 'wagmi'

interface IProps {
  coinSymbol: string
  setMintValue: (val: string) => void,
}

const BalanceCoin = (props: IProps) => {
  const { coinSymbol } = props  
  
  let address = useAccount().address
  let balance = "0"
  const value = useBalance({ address }).data?.value
  if (value) {
    balance = formatEther(value)
    balance = parseFloat(balance).toFixed(4)
  }
  
  return (
    <Flex justifyContent="flex-end" marginTop="12px">
      {/* <Text color="#999" fontSize="14px">$12.99</Text> */}
      <Box color="#999" fontSize="14px">
        Balance: {balance}
        <Button 
          isDisabled={!address}
          onClick={() => {props.setMintValue(balance);}}
          marginLeft="12px" colorScheme='teal' size='xs'>Max</Button>
      </Box>
    </Flex>
  )
}

export default BalanceCoin