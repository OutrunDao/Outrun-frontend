"use client"
import { List, ListItem, Heading, Tabs, Flex, TabList, Tab, Box, Text, Container } from '@chakra-ui/react'
import { StakeRETHDocument ,StakeRETHQuery, execute } from '@/subgraph'
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite"
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem'
import store from '@/app/stake/StakeStore'
import { ContractAddressMap } from "@/contants/address"
import { ContractAddrKey } from "@/types/index.d"

import PositionItem from './components/PositionItem'


const UnstakeABI = [{
  inputs: [
    {
      internalType: 'uint256',
      name: 'positionId',
      type: 'uint256',
    },
  ],
  name: 'unstake',
  outputs: [
    {
      internalType: 'uint256',
      name: '',
      type: 'uint256',
    },
  ],
  stateMutability: 'nonpayable',
  type: 'function',
}]

export default function Position() {
  const [positionList, setPositionList] = useState<StakeRETHQuery['stakeRETHs']>([])
  const account = useAccount().address;  

  useEffect(() => {
    execute(StakeRETHDocument, { account: account }).then((result: {data: StakeRETHQuery }) => {
      console.log('result.data.stakeRETHs', result.data.stakeRETHs);
      
      setPositionList(result.data.stakeRETHs)
    })
  }, [account])

  return(
    <Flex color="#fff" justifyContent="center">
      <Heading marginTop="44px">Positions: </Heading>
      <List marginTop="32px" width="800px">
        {
          positionList.map(item => <ListItem>
            <PositionItem positionId={item._positionId} />
          </ListItem>)
        }
      </List>
    </Flex>
  ) 
}