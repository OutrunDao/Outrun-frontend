import { Flex, Box, Button } from '@chakra-ui/react'
import { LocalTokenSymbol } from '@/types/index.d';
import ETHBalance from './ETHBalance'
import TokenBalance from './TokenBalance'
import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'

interface IProps {
  isConnected: boolean,
}

const BalanceCoin = (props: IProps) => {
  const { isConnected } = props  
  console.log('store.switchState', store.switchState);
  
  return (
    <Flex justifyContent="flex-end" marginTop="12px" color="#999" fontSize="14px">
      {
        store.selectedToken === 'ETH' 
          ? <ETHBalance></ETHBalance>
          : <TokenBalance></TokenBalance>
      }
      <Button 
        onClick={() => {
          store.inputValue = store.balance
        }}
        isDisabled={!isConnected}
        marginLeft="12px" 
        colorScheme='teal' 
        size='xs'>Max</Button>
    </Flex>
  )
}

export default observer(BalanceCoin)