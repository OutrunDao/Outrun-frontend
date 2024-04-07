"use client"
import { Tabs, Flex, TabList, Tab, Box, Text, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { observer } from "mobx-react-lite"
import { useAccount } from 'wagmi'
import { tabList, TabType, SwitchState, PairSelectList, TokenPairMap } from './types'
import { LocalTokenSymbol } from '@/types/index.d'
import { ArrowDownIcon } from '@chakra-ui/icons'
import PriceCoin from './components/PriceCoin'
import BalanceCoin from './components/Balance'
import InputSelect from './components/InputSelect'
import MintAndStakeTab from './components/MintAndStakeTab'

import store from '@/app/stake/StakeStore'

const  Stake = () => {
  const [currentTabType, setTabId] = useState<TabType>(TabType.Mint)
  const [currList, setCurrList] = useState<Array<LocalTokenSymbol>>(PairSelectList[TabType.Mint][0]) 
  const { address, isConnected, status} = useAccount()

  const setNewList = (newState: SwitchState) => {
    const newList = PairSelectList[currentTabType][newState]
    setCurrList(newList)
  }

  // 点击切换Token交换顺序
  useEffect(() => {
    setNewList(store.switchState)
    // 重置箭头切换
    store.switchState = 0
    if (currentTabType === TabType.Mint) {
      store.selectedToken = LocalTokenSymbol.ETH
    } else {
      store.selectedToken = LocalTokenSymbol.RETH
    }
  }, [currentTabType])


  type CurrTokenPair = typeof TokenPairMap[TabType]
  const currTokenPairMap: CurrTokenPair = TokenPairMap[currentTabType]

  const onSwitch =() => {
    const newState = store.switchState === 0 ? 1 : 0
    store.switchState = newState
    store.selectedToken = currTokenPairMap[store.selectedToken as keyof CurrTokenPair]
    setNewList(newState)
  }

  return(
    <Container className="stack" color="#fff" fontSize="14px" marginTop="100px">
      <Box border="1px solid #666" borderRadius="12px" paddingBottom="32px" width="460px">
        <Tabs isFitted>
          <TabList>
            {
              tabList.map((item) => {
                return <Tab key={item.key} onClick={() => setTabId(item.key)}>{item.label}</Tab>
              })
            }
          </TabList>

          <Container>
            <Box marginTop="32px" padding="22px" backgroundColor="#1E1E38" borderRadius="12px">
              <InputSelect currList={currList} currentTabType={currentTabType}></InputSelect>
              <BalanceCoin isConnected={isConnected}></BalanceCoin>
            </Box>

            <Flex justifyContent="center" marginTop="-12px">
              <ArrowDownIcon onClick={() => onSwitch()} boxSize={8} w={6} cursor="pointer" _hover={{ opacity: '0.5' }} />
            </Flex>
            
            {/* 带价格的 coin */}
            <PriceCoin selectedTokenPair={currTokenPairMap[store.selectedToken as keyof CurrTokenPair]}></PriceCoin>

            <Box marginTop="32px" padding="16px" backgroundColor="rgb(52 30 56 / 50%)" borderRadius="12px">
              <Flex justifyContent="space-between" marginTop="12px">
                <Text color="rgb(170, 170, 191)">RETH APR</Text>
                <Text color="rgb(170, 170, 191)">12.7%</Text>
              </Flex>
              <Flex justifyContent="space-between" marginTop="12px">
                <Text color="rgb(170, 170, 191)">ETH-RETH APR</Text>
                <Text color="rgb(170, 170, 191)">10.7%</Text>
              </Flex>
              <Flex justifyContent="space-between" marginTop="12px">
                <Text color="rgb(170, 170, 191)">Exchange rate</Text>
                <Text color="rgb(170, 170, 191)">1.00 ETH = 1.00 RETH</Text>
              </Flex>
            </Box>
            {
              isConnected 
                ? <MintAndStakeTab currentTabType={currentTabType} /> 
                : 
                  <Flex justifyContent='center' alignItems="center" marginTop="22px">
                    <w3m-button />
                  </Flex>
            }
          </Container>
        </Tabs>
      </Box>
      
    </Container>
  ) 
}

export default observer(Stake);