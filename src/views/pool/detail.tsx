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
  useToast,
} from '@chakra-ui/react';
import { useAccount, useChainId, usePublicClient } from 'wagmi';
import { useParams } from 'next/navigation';
import { AddIcon, ArrowBackIcon, ExternalLinkIcon, MinusIcon } from '@chakra-ui/icons';
import { BiMoneyWithdraw } from 'react-icons/bi';
import shortenAddress from '@/utils/shortenAddress';
import { execute, LiquidityPositionsDocument, LiquidityPosition } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
import { get, retry } from 'radash';
import getApy from '@/utils/getApy';
import { useEffect, useState } from 'react';
import { Address, PublicClient, WalletClient, formatUnits, getContract } from 'viem';
import { useWalletClient } from 'wagmi';

function getPairContract(client: PublicClient, address: Address, walletClient?: WalletClient) {
  return getContract({
    abi: [
      {
        type: 'function',
        name: 'claimMakerFee',
        inputs: [],
        outputs: [{ name: 'makerFee', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'nonpayable',
      },
      {
        type: 'function',
        name: 'viewUnClaimedFee',
        inputs: [],
        outputs: [
          { name: 'amount0', type: 'uint256', internalType: 'uint256' },
          { name: 'amount1', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
      },
    ],
    address,
    client: {
      public: client,
      wallet: walletClient,
    },
  });
}

export default function PoolDetail() {
  const account = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const { pair: pairAddress } = useParams<{ pair: string }>();
  const { data: userLiquidity } = useQuery({
    queryKey: ['userLiquidity', account.address, pairAddress],
    queryFn: async (): Promise<LiquidityPosition> => {
      return execute(LiquidityPositionsDocument, { user: account.address, pair: pairAddress }).then(
        (res: { data: { liquidityPositions: LiquidityPosition[] } }) => res.data.liquidityPositions[0]
      );
    },
  });
  const toast = useToast();
  const [unclaimedAmount0, setUnclaimedAmount0] = useState('0');
  const [unclaimedAmount1, setUnclaimedAmount1] = useState('0');

  useEffect(() => {
    if (!publicClient || !account) return;
    const contract = getPairContract(publicClient, pairAddress as Address, walletClient);
    // @ts-ignore
    contract.simulate.viewUnClaimedFee().then(({ result }) => {
      setUnclaimedAmount0(formatUnits(result[0]!, 18));
      setUnclaimedAmount1(formatUnits(result[1]!, 18));
    });
  }, [account, pairAddress, publicClient]);

  async function claimFeeHandler() {
    const contract = getPairContract(publicClient!, pairAddress as Address, walletClient);
    let toastCurrent = toast({
      status: 'loading',
      description: 'submitting transaction',
      duration: null,
    });
    // @ts-ignore
    const tx = await contract.write.claimMakerFee();
    toast.update(toastCurrent, {
      title: 'transaction submitted',
      description: 'Waiting for block confirmation',
      status: 'loading',
    });

    const data = await retry({ times: 20, delay: 5000 }, async () => {
      return await publicClient!.getTransactionReceipt({
        hash: tx as Address,
      });
    });
    toast.update(toastCurrent, {
      status: data.status === 'success' ? 'success' : 'error',
      title: data.status === 'success' ? 'claim success' : 'claim fail',
      description: '',
      isClosable: true,

      duration: 10000,
    });
    if (data.status === 'success') {
      setUnclaimedAmount0('0');
      setUnclaimedAmount1('0');
    }
    toast.closeAll();
  }

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

        {/* <GridItem colSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <Stat>
            <StatLabel>My Pool Position</StatLabel>
            <StatNumber>{(+get(userLiquidity, 'liquidityTokenBalance', '0')).toFixed(4)}</StatNumber>
          </Stat>
        </GridItem> */}
        <GridItem colSpan={2} rowSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <Heading as={'h5'} size={'sm'}>
            Unclaimed Rewards{' '}
          </Heading>
          <br />
          <Flex>
            <Box mr={100}> {get(userLiquidity, 'pair.token0.symbol')}</Box>
            <Box>
              {+unclaimedAmount0 > 0 && +unclaimedAmount0 < 0.001
                ? '<0.0001'
                : (+unclaimedAmount0).toFixed(4)}
            </Box>
          </Flex>
          <Flex mt={2}>
            <Box mr={100}> {get(userLiquidity, 'pair.token1.symbol')}</Box>
            <Box>
              {+unclaimedAmount1 > 0 && +unclaimedAmount1 < 0.001
                ? '<0.0001'
                : (+unclaimedAmount1).toFixed(4)}
            </Box>
          </Flex>
          <br />
          <Button
            width={'100%'}
            size={'sm'}
            colorScheme="teal"
            rounded={4}
            isDisabled={+unclaimedAmount0 <= 0}
            onClick={claimFeeHandler}
          >
            Claim
          </Button>
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
            <StatLabel>My Pool Balance </StatLabel>
            <StatNumber>
              $
              {(
                (+get(userLiquidity, 'liquidityTokenBalance', '0') /
                  +get(userLiquidity, 'pair.totalSupply', '1')) *
                +get(userLiquidity, 'pair.reserveUSD', '0')
              ).toFixed(4)}
            </StatNumber>
          </Stat>
          <br></br>
          <Flex>
            <Box mr={100}> {get(userLiquidity, 'pair.token0.symbol')}</Box>
            <Box>
              {(
                (+get(userLiquidity, 'liquidityTokenBalance', '0') /
                  +get(userLiquidity, 'pair.totalSupply', '1')) *
                +get(userLiquidity, 'pair.reserve0', '0')
              ).toFixed(4)}
            </Box>
          </Flex>
          <Flex mt={2}>
            <Box mr={100}> {get(userLiquidity, 'pair.token1.symbol')}</Box>
            <Box>
              {(
                (+get(userLiquidity, 'liquidityTokenBalance', '0') /
                  +get(userLiquidity, 'pair.totalSupply', '1')) *
                +get(userLiquidity, 'pair.reserve1', '0')
              ).toFixed(4)}
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
