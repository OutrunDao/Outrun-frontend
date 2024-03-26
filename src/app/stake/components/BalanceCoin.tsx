import { Flex, Box, Button } from '@chakra-ui/react'
import { LocalTokenSymbol } from '@/types/index.d';
interface IProps {
  selectedToken: LocalTokenSymbol
  tokenBalance: string,
  isConnected: boolean,
  setMintValue: (val: string) => void,
}

const BalanceCoin = (props: IProps) => {
  const { isConnected, tokenBalance } = props  

  return (
    <Flex justifyContent="flex-end" marginTop="12px">
      <Box color="#999" fontSize="14px">
        Balance: {tokenBalance}
        <Button 
          isDisabled={!isConnected}
          onClick={() => {props.setMintValue(tokenBalance);}}
          marginLeft="12px" colorScheme='teal' size='xs'>Max</Button>
      </Box>
    </Flex>
  )
}

export default BalanceCoin