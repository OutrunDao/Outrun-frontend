'use client';
import { List, ListItem, Heading, Tabs, Flex, TabList, Tab, Box, Text, Container } from '@chakra-ui/react';
import {
  RethPositionDocument,
  RusdPositionDocument,
  RethPositionQuery,
  RusdPositionQuery,
  execute,
} from '@/subgraph';
import { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import store from '@/app/stake/StakeStore';
import { ContractAddressMap } from '@/contants/address';
import { ContractAddrKey } from '@/types/index.d';

import RethItem from './components/RethItem';
import RusdItem from './components/RusdItem';

const UnstakeABI = [
  {
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
  },
];

export default function Position() {
  const [positionRETHList, setRETHPositionList] = useState<RethPositionQuery['stakeRETHs']>([]);
  const [positionRUSDList, setRUSDPositionList] = useState<RusdPositionQuery['stakeRUSDs']>([]);
  const account = useAccount().address;

  useEffect(() => {
    execute(RethPositionDocument, { account: account }).then((result: { data: RethPositionQuery }) => {
      setRETHPositionList(result.data.stakeRETHs);
    });
    execute(RusdPositionDocument, { account: account }).then((result: { data: RusdPositionQuery }) => {
      console.log('result.data', result.data.stakeRUSDs);
      setRUSDPositionList(result.data.stakeRUSDs);
    });
  }, [account]);

  return (
    <Flex color="#fff" justifyContent="center" flexDirection="column" alignItems="center">
      <Heading marginTop="44px">Positions: </Heading>
      <List marginTop="32px" width="800px">
        {positionRETHList.map((item) => (
          <ListItem key={item.positionId}>
            <RethItem
              id={item.id}
              positionId={item.positionId}
              amountInPETH={item.amountInPETH}
              amountInRETH={item.amountInRETH}
              amountInREY={item.amountInREY}
              deadline={item.deadline}
            />
          </ListItem>
        ))}
      </List>
      <List marginTop="32px" width="800px">
        {positionRUSDList.map((item) => (
          <ListItem key={item.positionId}>
            <RusdItem
              id={item.id}
              amountInPUSD={item.amountInPUSD}
              amountInRUSD={item.amountInRUSD}
              amountInRUY={item.amountInRUY}
              deadline={item.deadline}
              positionId={item.positionId}
            />
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}
