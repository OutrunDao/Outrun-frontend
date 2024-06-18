'use client';

import { Tabs, TabList, Tab, TabPanels, TabPanel, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, HStack, SimpleGrid, Spacer, Text, Tag, Flex } from '@chakra-ui/react';
import { execute, RethPositionDocument, StakeORETH, RusdPositionDocument, StakeORUSD } from '@/subgraph';
import dayjs from 'dayjs';
import ExtendDaysModal from './extendDaysModal';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { formatUnits } from 'viem';
import getOrethStake from '@/contracts/get/orethStakeManager';
import useContract from '@/hook/useContract';
import getOrUsdStake from '@/contracts/get/orusdStakeManager';

export default function PositionsView() {
  const account = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { write: writeContract } = useContract();
  const { data: rethPositions } = useQuery({
    queryKey: ['rethPositions', account.address],
    queryFn: async (): Promise<StakeORETH[]> => {
      return execute(RethPositionDocument, { account: account.address }).then((res: { data: { stakeORETHs: StakeORETH[] } }) => res.data.stakeORETHs);
    },
  });
  const { data: rusdPositions } = useQuery({
    queryKey: ['rusdPositions', account.address],
    queryFn: async (): Promise<StakeORUSD[]> => {
      return execute(RusdPositionDocument, { account: account.address }).then((res: { data: { stakeORUSDs: StakeORETH[] } }) => res.data.stakeORUSDs);
    },
  });
  async function onConfirmExtend(type: string, positionId: number, days: number) {
    if (type === 'oreth') {
      await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'extend lockup days',
        },
        'extendLockTime',
        [positionId, days],
        {
          account,
        }
      );
    } else {
      await writeContract(
        // @ts-ignore
        getOrUsdStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'extend lockup days',
        },
        'extendLockTime',
        [positionId, days],
        {
          account,
        }
      );
    }
  }

  async function unLock(type: string, positionId: number) {
    if (type === 'oreth') {
      await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'unLock',
        },
        'unstake',
        [positionId],
        {
          account,
        }
      );
    } else {
      await writeContract(
        // @ts-ignore
        getOrUsdStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'unLock',
        },
        'unstake',
        [positionId],
        {
          account,
        }
      );
    }
  }

  return (
    <Container mt={12}>
      <Tabs>
        <TabList>
          <Tab>orETH</Tab>
          <Tab>orUSD</Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0}>
            {rethPositions?.map((item) => {
              return (
                <Card m={0} colorScheme={'red'} key={item.positionId} mb={4}>
                  <CardHeader>#{item.positionId}</CardHeader>
                  <CardBody color={'gray'} fontSize={14}>
                    <SimpleGrid columns={2} spacing={2}>
                      <Box>
                        <Text color="#fff">orETH </Text>
                        <Text>{formatUnits(BigInt(item.amountInORETH), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">osETH</Text>
                        <Text>{formatUnits(BigInt(item.amountInOSETH), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">YieldToken</Text>
                        <Text>{formatUnits(BigInt(item.amountInREY), 18)} REY</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">EndDate </Text>
                        <Text>{dayjs(+item.deadline * 1000).format('YYYY/MM/DD hh:mm')}</Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                  <CardFooter alignSelf={'end'}>
                    <HStack>
                      {item.status == '0' ? (
                        <Tag colorScheme="gray">Closed</Tag>
                      ) : (
                        <>
                          <ExtendDaysModal deadline={+item.deadline} onConfirmExtend={(days: number) => onConfirmExtend('oreth', +item.positionId, days)}></ExtendDaysModal>
                          <Button size={'xs'} rounded={4} colorScheme={'blue'} onClick={() => unLock('oreth', +item.positionId)}>
                            unlock
                          </Button>
                        </>
                      )}
                    </HStack>
                  </CardFooter>
                </Card>
              );
            })}
          </TabPanel>
          <TabPanel paddingX={0}>
            {rusdPositions?.map((item) => {
              return (
                <Card m={0} colorScheme={'red'} key={item.positionId} mb={4}>
                  <CardHeader>
                    <Text>#{item.positionId}</Text>
                  </CardHeader>

                  <CardBody color={'gray'} fontSize={14}>
                    <SimpleGrid columns={2} spacing={2}>
                      <Box>
                        <Text color="#fff">orUSD </Text>
                        <Text>{formatUnits(BigInt(item.amountInORUSD), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">osUSD</Text>
                        <Text>{formatUnits(BigInt(item.amountInOSUSD), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">YieldToken</Text>
                        <Text>{formatUnits(BigInt(item.amountInRUY), 18)} RUY</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">EndDate </Text>
                        <Text>{dayjs(+item.deadline * 1000).format('YYYY/MM/DD hh:mm')}</Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>
                  <CardFooter alignSelf={'end'}>
                    <HStack>
                      {item.status == '0' ? (
                        <Tag colorScheme="gray">Closed</Tag>
                      ) : (
                        <>
                          <ExtendDaysModal deadline={+item.deadline} onConfirmExtend={(days: number) => onConfirmExtend('orusd', +item.positionId, days)}></ExtendDaysModal>
                          <Button size={'xs'} rounded={4} colorScheme={'blue'} onClick={() => unLock('orusd', +item.positionId)}>
                            unlock
                          </Button>
                        </>
                      )}
                    </HStack>
                  </CardFooter>
                </Card>
              );
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
