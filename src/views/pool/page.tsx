'use client';
import Link from 'next/link';
import { Box, Heading, Button, VStack, Tabs, TabList, Tab, TabPanel, TabPanels, HStack } from '@chakra-ui/react';
import { useChainId } from 'wagmi';
import UserLiquiditesPannel from './UserLiquidityPannel';
import PoolTvlPannel from './PoolTvlPannel';
import { useMemo } from 'react';
import { addressMap } from '@/contracts/addressMap';

const PoolIndex = () => {
  const chainId = useChainId();
  const oreth_orusd = useMemo(() => {
    return addressMap[chainId].ORETH_ORUSD;
  }, [chainId]);
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
              <Link href={`/pool/${oreth_orusd}/add-liquidity`} prefetch={true}>
                Add Liquidity
              </Link>
            </Button>
            <Button colorScheme="teal" rounded={4}>
              <Link href={'/pool/create'} prefetch={true}>
                Create a Pool
              </Link>
            </Button>
          </HStack>
        </VStack>
      </Box>
      <br />
      <br />

      <Tabs position="relative" variant="unstyled" colorScheme="pink">
        <TabList mx={18}>
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
