'use client';

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Button,
  Link,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  Tag,
  Flex,
  useToast,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Center,
  Input,
  Divider,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { execute, RethPositionDocument, StakeORETH, RusdPositionDocument, StakeORUSD } from '@/subgraph';
import dayjs from 'dayjs';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatUnits, parseUnits } from 'viem';
import getOrethStake from '@/contracts/get/orethStakeManager';
import useContract from '@/hook/useContract';
import getOrUsdStake from '@/contracts/get/orusdStakeManager';
import { RETH } from '@/contracts/reth';
import { OSETH } from '@/contracts/oseth';
import { OSUSD } from '@/contracts/osusd';
import parseTokenTransferLogs from '@/utils/parseTokenEvents';
import { addressMap } from '@/contracts/addressMap';
import { BlockExplorers } from '@/contracts/chains';
import { useMemo, useState } from 'react';
import { REY } from '@/contracts/rey';
import Decimal from 'decimal.js-light';
import { RUY } from '@/contracts/ruy';

export default function YieldPoolView() {
  const account = useAccount();
  const toast = useToast();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { write: writeContract } = useContract();
  const [withdrawReyAmount, setWithdrawReyAmount] = useState('');
  const [withdrawRuyAmount, setWithdrawRuyAmount] = useState('');
  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);

  const { data: avgStakeDaysOreth } = useQuery({
    queryKey: ['avgStakeDaysOreth', chainId],
    queryFn: async (): Promise<number> => {
      if (!publicClient) return 0;
      const result = (await getOrethStake(chainId, publicClient).read['avgStakeDays']()) as bigint;
      return Number(result.toString());
    },
  });
  const { data: unclaimedYieldingOreth } = useQuery({
    queryKey: ['unclaimedYieldingOreth', chainId],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return '0';
      const result = (await getOrethStake(chainId, publicClient).read['totalYieldPool']()) as bigint;
      return formatUnits(result, 18);
    },
  });

  const { data: apyOreth } = useQuery({
    queryKey: ['apyOreth', chainId, unclaimedYieldingOreth],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return '0';
      const supply = await REY[chainId].totalSupply(publicClient);
      return new Decimal(unclaimedYieldingOreth || '0').div(supply).mul(100).toDecimalPlaces(2).toString();
    },
  });

  const { data: reyBalance } = useQuery({
    queryKey: ['reyBalance', chainId, account.address],
    queryFn: async (): Promise<string> => {
      if (!publicClient || !account.address) return '0';
      const balance = await REY[chainId].balanceOf(account.address, publicClient);
      return balance.toString();
    },
  });

  //------------------
  const { data: avgStakeDaysOrusd } = useQuery({
    queryKey: ['avgStakeDaysOrusd', chainId],
    queryFn: async (): Promise<number> => {
      if (!publicClient) return 0;
      const result = (await getOrUsdStake(chainId, publicClient).read['avgStakeDays']()) as bigint;
      return Number(result.toString());
    },
  });
  const { data: unclaimedYieldingOrusd } = useQuery({
    queryKey: ['unclaimedYieldingOrusd', chainId],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return '0';
      const result = (await getOrUsdStake(chainId, publicClient).read['totalYieldPool']()) as bigint;
      return formatUnits(result, 18);
    },
  });

  const { data: apyOrusd } = useQuery({
    queryKey: ['apyOrusd', chainId, unclaimedYieldingOrusd],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return '0';
      const supply = await RUY[chainId].totalSupply(publicClient);
      return new Decimal(unclaimedYieldingOrusd || '0').div(supply).mul(100).toDecimalPlaces(2).toString();
    },
  });

  const { data: ruyBalance } = useQuery({
    queryKey: ['ruyBalance', chainId, account.address],
    queryFn: async (): Promise<string> => {
      if (!publicClient || !account.address) return '0';
      const balance = await RUY[chainId].balanceOf(account.address, publicClient);
      return balance.toString();
    },
  });

  async function withdrawHandler(type: string) {
    let data;
    if (type === 'rey') {
      if (!reyBalance || !withdrawReyAmount) return;
      if (reyBalance < withdrawReyAmount)
        return toast({
          title: 'token insufficient',
          status: 'error',
        });
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'withdrawYield',
        },
        'withdrawYield',
        [parseUnits(withdrawReyAmount, 18)],
        {
          account,
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['reyBalance'],
      });
    } else {
      if (!ruyBalance || !withdrawRuyAmount) return;
      if (ruyBalance < withdrawRuyAmount)
        return toast({
          title: 'token insufficient',
          status: 'error',
        });
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'withdrawYield',
        },
        'withdrawYield',
        [parseUnits(withdrawRuyAmount, 18)],
        {
          account,
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['ruyBalance'],
      });
    }
    if (data && data.status === 'success') {
      // console.log(data.logs);
      const log = parseTokenTransferLogs(data.logs);
      const adressSymbolMap = {
        [addressMap[chainId].ORETH.toLocaleLowerCase()]: {
          symbol: 'orETH',
          decimal: 18,
        },

        [addressMap[chainId].ORUSD.toLocaleLowerCase()]: {
          symbol: 'orUSD',
          decimal: 18,
        },
      } as Record<string, { symbol: string; decimal: number }>;
      const receivesText = Object.entries(log.to[account.address!])
        .map((item) => {
          if (!adressSymbolMap[item[0]]) return '';
          return `${formatUnits(item[1], adressSymbolMap[item[0]].decimal)} ${adressSymbolMap[item[0]].symbol}`;
        })
        .filter((i) => i)
        .join(', ');
      toast({
        title: 'withdraw finished',
        status: 'success',
        position: 'bottom',
        description: (
          <>
            {' '}
            {`You have successfully received ${receivesText}`}. view on
            <Link isExternal href={blockExplore + '/tx/' + data.transactionHash} textDecoration={'underline'} colorScheme="teal">
              BlastScan
            </Link>
          </>
        ),
        duration: null,
        isClosable: true,
      });
    }
  }

  return (
    <Container mt={12}>
      <Tabs>
        <TabList>
          <Tab>ETH Yield Pool</Tab>
          <Tab>USDB Yield Pool</Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0}>
            <Card m={0} mb={4}>
              <CardBody color={'gray'} fontSize={14}>
                <StatGroup my={4}>
                  <Stat>
                    <StatLabel>Average Staking Days</StatLabel>
                    <StatNumber color={'gray.100'} fontSize={18}>
                      {avgStakeDaysOreth}
                    </StatNumber>
                  </Stat>

                  <Stat>
                    <StatLabel>Unclaimed Yield</StatLabel>
                    <StatNumber color={'gray.100'} fontSize={18}>
                      {unclaimedYieldingOreth}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>APR</StatLabel>
                    <StatNumber color={'gray.100'} fontSize={18}>
                      {apyOreth}%
                    </StatNumber>
                  </Stat>
                </StatGroup>
              </CardBody>
            </Card>
            <Container borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md">
              <Box position="relative" padding="6">
                <AbsoluteCenter bg="#0d0703" px="4" fontSize={14}>
                  Burn REY To Claim ETH Native Yield
                </AbsoluteCenter>
              </Box>
              <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
                <Flex>
                  <Center textAlign={'center'} width={'120px'}>
                    <Text mr="14px">Amount</Text>
                    <Divider orientation="vertical" height={'20px'} />
                  </Center>
                  <Center width={'100%'}>
                    <Input variant="main" size="sm" textAlign={'right'} placeholder="withdraw amount" value={withdrawReyAmount} onChange={(e) => setWithdrawReyAmount(e.target.value)} />
                  </Center>
                </Flex>
              </Container>
              <br />
              <Flex flexDirection={'row-reverse'}>
                <Center ml={'14px'}>
                  <Text fontSize={'xs'}>Balance: {reyBalance}</Text>
                  <Button colorScheme="teal" variant="link" size={'xs'} ml={'6px'} textDecoration={'underline'} onClick={() => setWithdrawReyAmount(reyBalance || '')}>
                    MAX
                  </Button>
                </Center>
              </Flex>
              <Center width={'100%'} my={6}>
                <Button width={'100%'} rounded={4} colorScheme="teal" onClick={() => withdrawHandler('rey')}>
                  Burn
                </Button>
              </Center>
            </Container>
          </TabPanel>
          <TabPanel paddingX={0}>
            <Card m={0} mb={4}>
              <CardBody color={'gray'} fontSize={14}>
                <StatGroup my={4}>
                  <Stat>
                    <StatLabel>Average Staking Days</StatLabel>
                    <StatNumber color={'gray.100'} fontSize={18}>
                      {avgStakeDaysOrusd}
                    </StatNumber>
                  </Stat>

                  <Stat>
                    <StatLabel>Unclaimed Yield</StatLabel>
                    <StatNumber color={'gray.100'} fontSize={18}>
                      {unclaimedYieldingOrusd}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>APR</StatLabel>
                    <StatNumber color={'gray.100'} fontSize={18}>
                      {apyOrusd}%
                    </StatNumber>
                  </Stat>
                </StatGroup>
              </CardBody>
            </Card>
            <Container borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md">
              <Box position="relative" padding="6">
                <AbsoluteCenter bg="#0d0703" px="4" fontSize={14}>
                  Burn RUY To Claim ETH Native Yield
                </AbsoluteCenter>
              </Box>
              <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
                <Flex>
                  <Center textAlign={'center'} width={'120px'}>
                    <Text mr="14px">Amount</Text>
                    <Divider orientation="vertical" height={'20px'} />
                  </Center>
                  <Center width={'100%'}>
                    <Input variant="main" size="sm" textAlign={'right'} placeholder="withdraw amount" value={withdrawRuyAmount} onChange={(e) => setWithdrawRuyAmount(e.target.value)} />
                  </Center>
                </Flex>
              </Container>
              <br />
              <Flex flexDirection={'row-reverse'}>
                <Center ml={'14px'}>
                  <Text fontSize={'xs'}>Balance: {ruyBalance}</Text>
                  <Button colorScheme="teal" variant="link" size={'xs'} ml={'6px'} textDecoration={'underline'} onClick={() => setWithdrawRuyAmount(ruyBalance || '')}>
                    MAX
                  </Button>
                </Center>
              </Flex>
              <Center width={'100%'} my={6}>
                <Button width={'100%'} rounded={4} colorScheme="teal" onClick={() => withdrawHandler('ruy')}>
                  Burn
                </Button>
              </Center>
            </Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
