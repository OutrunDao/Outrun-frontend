'use client';
import Link from 'next/link';
import {
  Box,
  Icon,
  Text,
  Heading,
  IconButton,
  Container,
  Button,
  Input,
  InputGroup,
  VStack,
  Center,
  Card,
  CardBody,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Divider,
  HStack,
} from '@chakra-ui/react';
import TokenSelect, { getToken } from '@/components/TokenSelect';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { getRouterContract } from './getContract';
import UserLiquiditesPannel from './UserLiquidityPannel';
import PoolTvlPannel from './PoolTvlPannel';

const defaultSymbol = 'WETH';

const PoolIndex = () => {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const toast = useToast();
  const { data: walletClient } = useWalletClient();

  return (
    <Box>
      <Box mt="100">
        <VStack>
          <Heading as={'h2'}>Add Liquidity or Create a Pool</Heading>
          <br />
          <Heading as="h5" size={'sm'}>
            Become an LP to earn trading fees
          </Heading>
          <br />
          <HStack spacing={4}>
            <Button colorScheme="gray" rounded={4}>
              <Link href={'/pool/0x5e6c8991e1bddeae585cbb1f0d8d94d7fcb22f2e/add-liquidity'}>
                Add Liquidity
              </Link>
            </Button>
            <Button colorScheme="teal" rounded={4}>
              <Link href={'/pool/create'}>Create a Pool</Link>
            </Button>
          </HStack>
        </VStack>
      </Box>
      <br />
      <br />

      <Tabs position="relative" variant="unstyled" colorScheme="pink">
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'gray.500' }}>All Pools</Tab>
          <Tab _selected={{ color: 'white', bg: 'gray.500' }}>My Positions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PoolTvlPannel></PoolTvlPannel>
          </TabPanel>
          <TabPanel>
            <UserLiquiditesPannel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PoolIndex;
