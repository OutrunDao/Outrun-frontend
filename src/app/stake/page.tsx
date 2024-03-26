"use client"
import { Tabs, Flex, TabList, Tab, Box, Text, Container, localStorageManager } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useBalance, useAccount } from 'wagmi'
import { formatUnits, formatEther } from 'viem'
import { tabList, TabType, SwitchState, PairSelectList, TokenPairMap, TokenMint, TokenStake } from './types'
import { LocalTokenSymbol } from '@/types/index.d'
import { ArrowDownIcon } from '@chakra-ui/icons'

import { useTokenBalance } from './stake-utils'

import PriceCoin from './components/PriceCoin'
import BalanceCoin from './components/BalanceCoin'
import StakeButton from './components/StakeButton'
import InputSelect from './components/InputSelect'

export default function Stake () {
  const [currentTabType, setTabId] = useState<TabType>(TabType.Mint)
  const [inputValue, setInputValue] = useState<string>("0")
  const [switchState, setSwitchState] = useState<SwitchState>(0)
  const [selectedToken, setSelectedToken] = useState<LocalTokenSymbol>(LocalTokenSymbol.ETH)
  const [currList, setCurrList] = useState<Array<LocalTokenSymbol>>(PairSelectList[TabType.Mint][0]) 
  const [currIndex, setCurrIndex] = useState<number>(0) 
  const currTokenPairMap = TokenPairMap[currentTabType]
  const { address, isConnected} = useAccount()
  let balance = "0"
  const value = useBalance({ address }).data?.value

  if (value) {
    balance = formatEther(value)
    balance = parseFloat(balance).toFixed(4)
  }
  // // 切换 Tab
  // useEffect(() => {
    
  // }, [currentTabType])
  
  const setNewList = (newState: SwitchState) => {
    const newList = PairSelectList[currentTabType][newState]
    setCurrList(newList)
  }

  // 点击切换Token交换顺序
  useEffect(() => {
    setNewList(switchState)
    // 重置箭头切换
    setSwitchState(0)
    if (currentTabType === TabType.Mint) {
      setSelectedToken(LocalTokenSymbol.ETH)
    } else {
      setSelectedToken(LocalTokenSymbol.RETH)
    }
  }, [currentTabType])

 

  const onSwitch =() => {
    const newState = switchState === 0 ? 1 : 0
    setSwitchState(newState)
    setNewList(newState)
    setSelectedToken(currTokenPairMap[selectedToken])
  }

  const tokenBalance = useTokenBalance(selectedToken)

  console.log('tokenBalance', tokenBalance);
  

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
                selectedToken={selectedToken}
                currList={currList}
                inputValue={inputValue}
                onChangeInput={(value) => setInputValue(value)}
                onChangeSelect={(value) => setSelectedToken(value)}
                currentTabType={currentTabType}></InputSelect>
              
              <BalanceCoin
                isConnected={isConnected}
                tokenBalance={tokenBalance}
                selectedToken={selectedToken}
                setMintValue={(value) => setInputValue(value)} ></BalanceCoin>
            </Box>

            <Flex justifyContent="center" marginTop="-12px">
              <ArrowDownIcon onClick={() => onSwitch()} boxSize={8} w={6} cursor="pointer" _hover={{ opacity: '0.5' }} />
            </Flex>
            
            {/* 带价格的 coin */}
            <PriceCoin selectedTokenPair={currTokenPairMap[selectedToken]}></PriceCoin>

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
              switchState={switchState}
              selectedToken={selectedToken}
              account={address}
              inputValue={inputValue}
              isConnected={isConnected} 
              currentTabType={currentTabType}></StakeButton>
          </Container>
        </Tabs>
      </Box>
      
    </Container>
  ) 
}