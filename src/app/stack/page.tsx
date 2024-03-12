"use client"
import Link from 'next/link'
import { Tabs,Tag, Flex, Input, TabList, TabPanels, Tab, TabPanel, Box, Icon, Text, useColorMode, useColorModeValue, Heading ,Container, Button, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { useBalance, useAccount, useAccountEffect, type UseBalanceParameters, type UseAccountEffectParameters } from 'wagmi'
import { formatUnits } from 'viem'

export default function Stack () {
  const [tabId, setId] = useState(0)
  const [mintValue, setMintValue] = useState("0")
  
  let address = useAccount().address
  let balance = "0"
  const value = useBalance({ address }).data?.value
  if (value) {
    balance = formatUnits(value, 18)
  }

  console.log('balance', balance);
  

  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', data.address)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  })

  console.log('tabId', tabId);

  return(
    <Container className="stack" color="#fff" fontSize="14px">
      <Box border="1px solid #666" borderRadius="12px" paddingBottom="32px" width="460px">
        <Tabs isFitted>
          <TabList>
            <Tab onClick={() => setId(0)}>Mint</Tab>
            <Tab onClick={() => setId(1)}>Stack</Tab>
          </TabList>

            <Container>
              <Box marginTop="32px" padding="22px" backgroundColor="#1E1E38" borderRadius="12px">
                <Flex>
                  <Input placeholder="0.00000" value={mintValue} onChange={(e) => setMintValue(e.target.value)} marginRight="22px" border="none" />
                  <Text backgroundColor="rgb(52 30 56 / 50%)" borderRadius="12px" padding="6px 22px">
                    ETH
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" marginTop="12px">
                  <Text color="#999" fontSize="14px">$12.99</Text>
                  <Text color="#999" fontSize="14px">Balance: {balance}, Max</Text>
                </Flex>
              </Box>
              <Box>
                <Flex justifyContent="space-between" padding="22px" alignItems="center">
                  <Text color="rgb(252 252 3 / 50%)">0.993</Text>
                  <Text backgroundColor="#1E1E38" borderRadius="12px" padding="6px 22px">
                    RETH
                  </Text>
                </Flex>
              </Box>
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
              <Button colorScheme='rgb(52 30 56 / 50%)' width="100%" border="0.5px solid rgb(252 252 3)" color="rgb(252 252 3)" backgroundColor="rgb(52 30 56 / 50%)" marginTop="22px">
                { tabId === 0 ?  "Mint" : "Stack" }
              </Button>
              {/* <w3m-button /> */}
            </Container>
        </Tabs>
      </Box>
      
    </Container>
  ) 
}