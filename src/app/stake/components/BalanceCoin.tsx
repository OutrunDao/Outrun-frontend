import { Text, Flex, Box, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { formatUnits, formatEther } from 'viem'
import { useBalance, useAccount, useAccountEffect, type UseBalanceParameters, type UseAccountEffectParameters } from 'wagmi'

interface IProps {
  coinSymbol: string
  balance: string,
  isConnect: boolean,
  setMintValue: (val: string) => void,
}

const BalanceCoin = (props: IProps) => {
  const { isConnect, balance, coinSymbol } = props  
  
  return (
    <Flex justifyContent="flex-end" marginTop="12px">
      {/* <Text color="#999" fontSize="14px">$12.99</Text> */}
      <Box color="#999" fontSize="14px">
        Balance: {balance}
        <Button 
          isDisabled={!isConnect}
          onClick={() => {props.setMintValue(balance);}}
          marginLeft="12px" colorScheme='teal' size='xs'>Max</Button>
      </Box>
    </Flex>
  )
}

export default BalanceCoin