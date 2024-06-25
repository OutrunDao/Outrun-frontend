'use client';

import { Tabs, TabList, Tab, TabPanels, TabPanel, Box, Button, Link, Card, CardBody, CardFooter, CardHeader, Container, HStack, SimpleGrid, Spacer, Text, Tag, Flex, useToast } from '@chakra-ui/react';
import { execute, RethPositionDocument, StakeORETH, RusdPositionDocument, StakeORUSD } from '@/subgraph';
import dayjs from 'dayjs';
import ExtendDaysModal from './extendDaysModal';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatUnits } from 'viem';
import getOrethStake from '@/contracts/get/orethStakeManager';
import useContract from '@/hook/useContract';
import getOrUsdStake from '@/contracts/get/orusdStakeManager';
import { RETH } from '@/contracts/reth';
import { OSETH } from '@/contracts/oseth';
import { OSUSD } from '@/contracts/osusd';
import parseTokenTransferLogs from '@/utils/parseTokenEvents';
import { addressMap } from '@/contracts/addressMap';
import { BlockExplorers } from '@/contracts/chains';
import { useMemo } from 'react';

export default function PositionsView() {
  const account = useAccount();
  const toast = useToast();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { write: writeContract } = useContract();
  const { data: rethPositions } = useQuery({
    queryKey: ['rethPositions', account.address],
    queryFn: async (): Promise<StakeORETH[]> => {
      return execute(RethPositionDocument, { account: account.address }).then((res: { data: { stakeORETHs: StakeORETH[] } }) => res.data.stakeORETHs);
    },
  });

  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);
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

  async function unLock(type: string, positionId: number, deadline: number, pledgeAmount: string) {
    if (!account.address || !publicClient)
      return toast({
        title: 'wallet disconnected',
        status: 'error',
      });
    pledgeAmount = formatUnits(BigInt(pledgeAmount), 18);
    let data;
    if (deadline > Math.floor(new Date().getTime() / 1000)) {
      const yes = confirm('Whether to force the closure of an unexpired position ?');
      if (!yes) return;
    }
    if (type === 'oreth') {
      const osBalance = await OSETH[chainId].balanceOf(account.address, publicClient);
      // console.log(osBalance.toString());

      if (osBalance.lessThan(pledgeAmount))
        return toast({
          title: `You need ${pledgeAmount} osETH to unlock your position`,
          status: 'error',
        });
      data = await writeContract(
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

      queryClient.invalidateQueries({
        queryKey: ['rethPositions'],
      });
    } else {
      const osBalance = await OSUSD[chainId].balanceOf(account.address, publicClient);
      if (osBalance.lessThan(pledgeAmount))
        return toast({
          title: `You need ${pledgeAmount} osUSD to unlock your position`,
          status: 'error',
        });
      data = await writeContract(
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
      queryClient.invalidateQueries({
        queryKey: ['rusdPositions'],
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
        title: 'unlock finished',
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
          <Tab>ETH Position</Tab>
          <Tab>USDB Position</Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0}>
            {rethPositions?.map((item) => {
              return (
                <Card m={0} colorScheme={'red'} key={item.positionId} mb={4}>
                  <CardHeader textAlign={'right'} fontSize={13}>
                    #{item.positionId}
                  </CardHeader>
                  <CardBody color={'gray'} fontSize={14}>
                    <SimpleGrid columns={2} spacing={2}>
                      <Box>
                        <Text color="#fff">Staked orETH </Text>
                        <Text>{formatUnits(BigInt(item.amountInORETH), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">Generated osETH</Text>
                        <Text>{formatUnits(BigInt(item.amountInOSETH), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">Generated YT</Text>
                        <Text>{formatUnits(BigInt(item.amountInREY), 18)} REY</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">Unlock Time </Text>
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
                          <Button size={'xs'} rounded={4} colorScheme={'blue'} onClick={() => unLock('oreth', +item.positionId, item.deadline, item.amountInOSETH)}>
                            UnStake
                          </Button>
                        </>
                      )}
                    </HStack>
                  </CardFooter>
                </Card>
              );
            })}
            {!rethPositions ||
              (!rethPositions.length && (
                <Text textAlign={'center'} mt={4}>
                  You have no ETH position
                </Text>
              ))}
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
                        <Text color="#fff">Staked orUSD </Text>
                        <Text>{formatUnits(BigInt(item.amountInORUSD), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">Generated osUSD</Text>
                        <Text>{formatUnits(BigInt(item.amountInOSUSD), 18)}</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">Generated YT</Text>
                        <Text>{formatUnits(BigInt(item.amountInRUY), 18)} RUY</Text>
                      </Box>
                      <Box>
                        <Text color="#fff">Unlock Time </Text>
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
                          <Button size={'xs'} rounded={4} colorScheme={'blue'} onClick={() => unLock('orusd', +item.positionId, item.deadline, item.amountInOSUSD)}>
                            UnStake
                          </Button>
                        </>
                      )}
                    </HStack>
                  </CardFooter>
                </Card>
              );
            })}
            {!rusdPositions ||
              (!rusdPositions.length && (
                <Text textAlign={'center'} mt={4}>
                  You have no USDB position
                </Text>
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
