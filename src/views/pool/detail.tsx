'use client';
import { Link } from '@chakra-ui/next-js';
import {
  Center,
  Container,
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Grid,
  GridItem,
  Button,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import { useAccount, useChainId } from 'wagmi';
import { useParams } from 'next/navigation';
import { AddIcon, ArrowBackIcon, ExternalLinkIcon, MinusIcon } from '@chakra-ui/icons';
import { BiMoneyWithdraw } from 'react-icons/bi';
import shortenAddress from '@/utils/shortenAddress';
import { execute, LiquidityPositionsDocument, LiquidityPosition } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
import { get } from 'radash';
import getApy from '@/utils/getApy';

export default function PoolDetail() {
  const account = useAccount();
  const { pair: pairAddress } = useParams<{ pair: string }>();
  const { data: userLiquidity } = useQuery({
    queryKey: ['userLiquidity', account.address, pairAddress],
    queryFn: async (): Promise<LiquidityPosition> => {
      return execute(LiquidityPositionsDocument, { user: account.address, pair: pairAddress }).then(
        (res: { data: { liquidityPositions: LiquidityPosition[] } }) => res.data.liquidityPositions[0]
      );
    },
  });
  return (
    <Container maxW={'container.lg'} p={0}>
      <Box my={6}>
        <Link href={'/pool'}>
          <ArrowBackIcon mx="2px" /> All pools
        </Link>
      </Box>
      <Flex my={4}>
        <Box>
          <Heading as={'h3'} size={'md'}>
            {get(userLiquidity, 'pair.token0.symbol')} - {get(userLiquidity, 'pair.token1.symbol')}
          </Heading>
        </Box>
        <Spacer></Spacer>
        <HStack>
          <Link href={`/pool/` + pairAddress + '/add-liquidity'}>
            <Button size={'md'} rounded={4} leftIcon={<AddIcon fontSize={'smaller'} />}>
              add liquidity
            </Button>
          </Link>
          <Link href={`/pool/${pairAddress}/withdraw`}>
            <Button size={'md'} rounded={4} leftIcon={<BiMoneyWithdraw fontSize={'md'} />}>
              withdraw
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Grid h="400px" templateRows="repeat(4, 1fr)" templateColumns="repeat(6, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={4} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <StatGroup mt={4}>
            <Stat>
              <StatLabel>TVL</StatLabel>
              <StatNumber>${(+get(userLiquidity, 'pair.reserveUSD', '0')).toFixed(2) || 0}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Volume(24h)</StatLabel>
              <StatNumber>
                ${(+get(userLiquidity, 'pair.pairDayData[0].reserveUSD', '0')).toFixed(2)}
              </StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup mt={6}>
            <Stat>
              <StatLabel>APY</StatLabel>
              <StatNumber>
                {getApy(
                  get(userLiquidity, 'pair.pairDayData[0].reserveUSD', '0'),
                  get(userLiquidity, 'pair.reserveUSD', '0')
                )}
                %
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Address</StatLabel>
              <StatNumber>
                <Link href={'https://testnet.blastscan.io/address/' + pairAddress} isExternal>
                  {shortenAddress(pairAddress)}
                  <ExternalLinkIcon ml="4px" mt={-1} />
                </Link>
              </StatNumber>
            </Stat>
          </StatGroup>
        </GridItem>

        <GridItem colSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <Stat>
            <StatLabel>My Pool Position</StatLabel>
            <StatNumber>{(+get(userLiquidity, 'liquidityTokenBalance', '0')).toFixed(4)}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <HStack>
            <Stat>
              <StatLabel>Reward Fees</StatLabel>
              <StatNumber>345,670</StatNumber>
            </Stat>
            <Button colorScheme="teal" rounded={4}>
              Claim
            </Button>
          </HStack>
        </GridItem>
        <GridItem rowSpan={2} colSpan={4} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <Heading as={'h4'} size={'md'}>
            Tokens Compose
          </Heading>
          <br />
          <Flex>
            <Box mr={100}> {get(userLiquidity, 'pair.token0.symbol')}</Box>
            <Box>{(+get(userLiquidity, 'pair.reserve0', '0')).toFixed(6)}</Box>
          </Flex>
          <Flex mt={2}>
            <Box mr={100}> {get(userLiquidity, 'pair.token1.symbol')}</Box>
            <Box>{(+get(userLiquidity, 'pair.reserve1', '0')).toFixed(6)}</Box>
          </Flex>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <Stat>
            <StatLabel>Pool Liquidity </StatLabel>
            <StatNumber>345,670</StatNumber>
          </Stat>
        </GridItem>
      </Grid>
    </Container>
  );
}
