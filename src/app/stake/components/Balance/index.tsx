import { useState } from 'react'
import { Text, Flex, Slider, SliderTrack, SliderThumb, SliderFilledTrack, Box, Button } from '@chakra-ui/react'
import { LocalTokenSymbol } from '@/types/index.d';
import ETHBalance from './ETHBalance'
import TokenBalance from './TokenBalance'
import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'
import { TabType, SwitchState } from '@/app/stake/types';

interface IProps {
  isConnected: boolean,
}

const BalanceCoin = (props: IProps) => {
  const [stakeDays, setStakeDays] = useState<number>(30)
  const { isConnected } = props  
  const onChangeDays = (val: number) => {
    setStakeDays(val)
    store.stakeDays = val
  }

  console.log('store.switchState', store.switchState);
  
  return (
    <Box marginTop="12px" fontSize="14px">

      <Flex justifyContent="flex-end">
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
      {
        store.currentTabType === TabType.Stake
        && store.switchState === 0
        &&
        <Flex justifyContent="space-between" marginTop="12px">
          <Slider max={365} min={0} aria-label='slider-ex-1' defaultValue={30} colorScheme="#fcfc10" onChangeEnd={(val) => onChangeDays(val)}>
            <SliderTrack bg="#fff">
              <SliderFilledTrack bg="#fcfc10" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex marginLeft="16px" fontSize="15px" fontWeight="bold" width="160px"><Text marginRight="12px" paddingLeft="8px" color="#fcfc10"> {stakeDays}</Text> Days</Flex>
        </Flex>
      }
    </Box>
  )
}

export default observer(BalanceCoin)