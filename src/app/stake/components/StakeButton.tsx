import { Text, Button, Box, Flex } from '@chakra-ui/react'
import { TabType, MintType, StakeType, IIswitch } from '../types'

interface IProps {
  currentTabType: TabType,
  isSwitchCoin: IIswitch,
  isConnect: boolean
}

const StakeButton = (props: IProps) => {
  if (!props.isConnect) {
    return <Flex justifyContent='center' alignItems="center" marginTop="22px">
      <w3m-button />
    </Flex>
  }

  return (
    <Button colorScheme='rgb(52 30 56 / 50%)' width="100%" border="0.5px solid rgb(252 252 3)" color="rgb(252 252 3)" backgroundColor="rgb(52 30 56 / 50%)" marginTop="22px">
      { 
        props.currentTabType === TabType.Mint
        ?  
          <Text>
            { props.isSwitchCoin[TabType.Mint] ? MintType.Mint : MintType.Redeem }
          </Text> 
        : 
          <Text>
            { props.isSwitchCoin[TabType.Stake] ? StakeType.Stake : StakeType.Unstake }
          </Text> 
      }
    </Button>
  )
}

export default StakeButton