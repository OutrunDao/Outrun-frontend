import { Flex, Box, Button } from '@chakra-ui/react'
import { LocalTokenSymbol } from '@/types/index.d';
import ETHBalance from './ETHBalance'
import TokenBalance from './TokenBalance'

interface IProps {
  selectedToken: LocalTokenSymbol
  isConnected: boolean,
  setMintValue: (val: string) => void,
}

const BalanceCoin = (props: IProps) => {
  const { isConnected, selectedToken } = props  
  
  return (
    <Flex justifyContent="flex-end" marginTop="12px">
      <Box color="#999" fontSize="14px">
        {
          selectedToken === 'ETH' 
            ? <ETHBalance></ETHBalance>
            : <TokenBalance selectedToken={selectedToken}></TokenBalance>
        }

        <Button 
          isDisabled={!isConnected}
          marginLeft="12px" colorScheme='teal' size='xs'>Max</Button>
      </Box>
    </Flex>
  )
}

export default BalanceCoin