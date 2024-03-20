"use client"
import Link from 'next/link'
import { Img, Tabs,Tag, Flex, Input, TabList, TabPanels, Tab, TabPanel, Box, Icon, Text, useColorMode, useColorModeValue, Heading ,Container, Button, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useBalance, useAccount, useAccountEffect, type UseBalanceParameters, type UseAccountEffectParameters } from 'wagmi'
import { formatUnits, formatEther } from 'viem'
import { tabList, TabType, IIswitch, MintType, StakeType } from './types'
import { ArrowDownIcon } from '@chakra-ui/icons'

import PriceCoin from './components/PriceCoin'
import BalanceCoin from './components/BalanceCoin'
import StakeButton from './components/StakeButton'

export default function Stake () {
  const [currentTabType, setTabId] = useState<TabType>(TabType.Mint)
  const [mintValue, setMintValue] = useState<string>("0")
  const [isSwitchCoin, setIsSwitchCoin] = useState<IIswitch>({
    [TabType.Mint]: true,
    [TabType.Stake]: true,
  })
  const [coinPairs, setCoinPairs] = useState(['ETH', 'RETH'])
  
  let account = useAccount().address
  
  let balance = "0"
  const value = useBalance({ address: account }).data?.value
  if (value) {
    balance = formatEther(value)
    balance = parseFloat(balance).toFixed(4)
  }

  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', data.address)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  })
  
  const onSwitchCoinType =() => {
    const switchPairs = [coinPairs[1], coinPairs[0]]
    setCoinPairs(switchPairs)
    setIsSwitchCoin({
      ...isSwitchCoin,
      [currentTabType]: !isSwitchCoin[currentTabType]
    })
  }

  // useEffect(() => {
  //   if (currentTabType === TabType.Mint) {
  //     setMintState(isSwitchCoin ? MintType.Mint : MintType.Redeem)
  //   } else {
  //     setStakeState(isSwitchCoin ? StakeType.Stake : StakeType.Unstake)
  //   }
  // }, [isSwitchCoin])

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
              <Flex>
                <Input width="280px" boxShadow="0 0 0 1px #3182ce" borderColor="#3182ce" placeholder="0.00000" value={mintValue} onChange={(e) => setMintValue(e.target.value)} marginRight="22px" border="none" />
                <Flex flex="1" alignItems="center" justifyContent="center" backgroundColor="rgb(52 30 56 / 50%)" borderRadius="18px">
                  <Img height="18px" src="eth.png"></Img>
                  <Text textAlign="center">{coinPairs[0]}</Text>
                </Flex>
              </Flex>

              <BalanceCoin 
                coinSymbol={coinPairs[0]} 
                setMintValue={(value) => setMintValue(value)} ></BalanceCoin>
            </Box>
            <Flex justifyContent="center" marginTop="-12px">
              <ArrowDownIcon onClick={() => onSwitchCoinType()} boxSize={8} w={6} cursor="pointer" _hover={{ opacity: '0.5' }} />
            </Flex>
            
            {/* 带价格的 coin */}
            <PriceCoin  coinSymbol={coinPairs[1]}></PriceCoin>

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
            
            <StakeButton isSwitchCoin={isSwitchCoin} currentTabType={currentTabType}></StakeButton>
          </Container>
        </Tabs>
      </Box>
      
    </Container>
  ) 
}