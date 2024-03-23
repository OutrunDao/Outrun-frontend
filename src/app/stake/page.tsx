"use client"
import { Tabs, Flex, TabList, Tab, Box, Text, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useBalance, useAccount } from 'wagmi'
import { formatUnits, formatEther } from 'viem'
import { tabList, TabType, IIswitch, PairSelectList } from './types'
import { LocalTokenSymbol } from '@/types/index.d'
import { ArrowDownIcon } from '@chakra-ui/icons'

import PriceCoin from './components/PriceCoin'
import BalanceCoin from './components/BalanceCoin'
import StakeButton from './components/StakeButton'
import InputSelect from './components/InputSelect'

export default function Stake () {
  const [currentTabType, setTabId] = useState<TabType>(TabType.Mint)
  const [inputValue, setInputValue] = useState<string>("0")
  const [isSwitchCoin, setIsSwitchCoin] = useState<IIswitch>({
    [TabType.Mint]: 0,
    [TabType.Stake]: 0,
  })
  const [selectedToken, setSelectedToken] = useState<LocalTokenSymbol>(LocalTokenSymbol.ETH)
  const [currList, setCurrList] = useState<Array<Array<LocalTokenSymbol>>>(PairSelectList[currentTabType]) 
  const [currIndex, setCurrIndex] = useState<number>(0) 

  const { address, isConnected} = useAccount()
  let balance = "0"
  const value = useBalance({ address }).data?.value

  if (value) {
    balance = formatEther(value)
    balance = parseFloat(balance).toFixed(4)
  }

  // 点击切换Token交换顺序
  useEffect(() => {
    const newList = currList.map((item, index) => {
      if (item.includes(selectedToken)) {
        [item[1], item[0]] = [item[0], item[1]]
        setCurrIndex(index)
      }
      return item
    })
    
    setCurrList(newList)
  }, [isSwitchCoin[currentTabType]])

  useEffect(() => {
    setCurrList(PairSelectList[currentTabType])
    setCurrIndex(0)
    setIsSwitchCoin({
      [TabType.Mint]: 0,
      [TabType.Stake]: 0,
    })
  }, [currentTabType])

  useEffect(() => {
    currList.forEach((item, index) => {
      if (item.includes(selectedToken)) {
        setCurrIndex(index)
      }
    })
  }, [selectedToken])
  
  const onSwitchCoinType =() => {
    setIsSwitchCoin({
      ...isSwitchCoin,
      [currentTabType]: isSwitchCoin[currentTabType] === 0 ? 1 : 0,
    })
  }

  console.log('currList', currList);
  

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
              <InputSelect
                coinSymbol={currList[currIndex][0]}
                currList={currList}
                inputValue={inputValue}
                onChangeInput={(value) => setInputValue(value)}
                onChangeSelect={(value) => setSelectedToken(value)}
                currentTabType={currentTabType}></InputSelect>
              
              <BalanceCoin
                account={address}
                isConnected={isConnected}
                balance={balance}
                coinSymbol={currList[currIndex][0]}
                setMintValue={(value) => setInputValue(value)} ></BalanceCoin>
            </Box>

            <Flex justifyContent="center" marginTop="-12px">
              <ArrowDownIcon onClick={() => onSwitchCoinType()} boxSize={8} w={6} cursor="pointer" _hover={{ opacity: '0.5' }} />
            </Flex>
            
            {/* 带价格的 coin */}
            <PriceCoin coinSymbol={currList[currIndex][1]}></PriceCoin>

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
            
            <StakeButton 
              coinSymbol={currList[currIndex][1]}
              account={address}
              inputValue={inputValue}
              isConnected={isConnected} 
              isSwitchCoin={isSwitchCoin} 
              currentTabType={currentTabType}></StakeButton>
          </Container>
        </Tabs>
      </Box>
      
    </Container>
  ) 
}