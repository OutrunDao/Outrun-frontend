'use client';

import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Link,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import TokenSelect from '@/components/TokenSelect';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { execute, PairDocument, LiquidityPositionsDocument, LiquidityPosition, Pair as PairType } from '@/subgraph';
import React, { useEffect, useMemo, useState } from 'react';
import { Token } from '@/packages/swap-core';
import { chain, get, retry } from 'radash';
import Decimal from 'decimal.js-light';
import { formatUnits, parseEventLogs, parseUnits } from 'viem';
import tokenSwitch, { CurrencyPairType } from '../tokenSwitch';
import TransferEventAbi from './TransferEvent.abi.json';
import getTokenContract from '@/contracts/get/erc20token';
import useContract from '@/hook/useContract';
import { ContractName, addressMap } from '@/contracts/addressMap';
import parseTokenTransferLogs from '@/utils/parseTokenEvents';
import { BlockExplorers } from '@/contracts/chains';

enum BtnAction {
  disconnect,
  disable,
  available,
  approve,
}
const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
};

export default function WithdrawPage() {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const { write: writeContract } = useContract();
  const { pair: pairAddress } = useParams<{ pair: string }>();
  const [lpAmount, setLpAmount] = useState('');
  const [action, setAction] = useState(BtnAction.disconnect);
  const [token0, setToken0] = useState<Token>();
  const [token1, setToken1] = useState<Token>();
  const [token0Value, setToken0Value] = useState('0');
  const [token1Value, setToken1Value] = useState('0');
  const [loading, setLoading] = useState(false);
  const { data: pairTarget } = useQuery({
    queryKey: ['pairfind', pairAddress],
    queryFn: async (): Promise<PairType> => {
      return execute(PairDocument, { addr: pairAddress }).then((res: { data: { pairs: PairType[] } }) => res.data.pairs[0]);
    },
  });
  const { data: userLiquidityPosition } = useQuery({
    queryKey: ['userLiquidityPosition', account.address, pairAddress],
    queryFn: async (): Promise<LiquidityPosition[]> => {
      return execute(LiquidityPositionsDocument, { user: account.address, pair: pairAddress }).then((res: { data: { liquidityPositions: LiquidityPosition[] } }) => res.data.liquidityPositions);
    },
  });
  const [sliderValue, setSliderValue] = useState(100);
  const V2_ROUTER_ADDRESSES = useMemo(() => {
    return addressMap[chainId].SWAP_ROUTER;
  }, [chainId]);
  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);
  useEffect(() => {
    if (!pairAddress || !pairTarget || !publicClient) return;
    const token0 = new Token(chainId, pairTarget.token0.id, +pairTarget.token0.decimals, pairTarget.token0.symbol, pairTarget.token0.name);
    setToken0(token0);
    const token1 = new Token(chainId, pairTarget.token1.id, +pairTarget.token1.decimals, pairTarget.token1.symbol, pairTarget.token1.name);
    setToken1(token1);
  }, [pairTarget, chainId]);
  useEffect(() => {
    const userBalance = get(userLiquidityPosition, '[0].liquidityTokenBalance', 0);
    setLpAmount(new Decimal(userBalance).times(sliderValue).div(100).toString());
  }, [sliderValue, userLiquidityPosition]);

  useEffect(() => {
    if (account.isDisconnected) setAction(BtnAction.disconnect);
    const userBalance = +get(userLiquidityPosition, '[0].liquidityTokenBalance', 0);
    if (!userBalance || !userLiquidityPosition) return setAction(BtnAction.disable);
    const position = userLiquidityPosition[0];
    if (userBalance == 0 || !position) return;
    const validWithdrawAmount = Math.min(userBalance, +lpAmount);
    if (+lpAmount > userBalance) {
      setAction(BtnAction.disable);
    } else {
      setAction(BtnAction.available);
    }
    const token0Value = new Decimal(validWithdrawAmount).div(position.pair.totalSupply).times(position.pair.reserve0).toString();
    const token1Value = new Decimal(validWithdrawAmount).div(position.pair.totalSupply).times(position.pair.reserve1).toString();
    setToken0Value(token0Value);
    setToken1Value(token1Value);
  }, [lpAmount]);

  function handleLpAmount(value: string) {
    setLpAmount(value);
  }
  async function removeLiquidity() {
    if (!publicClient) return;
    setLoading(true);
    const tokenContract = getTokenContract(get(userLiquidityPosition, '[0].pair.id'), publicClient, walletClient);
    await writeContract(
      // @ts-ignore
      tokenContract,
      {
        actionTitle: 'Approve Liquidity Token',
      },
      'approve',
      [V2_ROUTER_ADDRESSES, parseUnits(lpAmount, 18)],
      {
        account,
      }
    );

    const deadline = Math.floor(new Date().getTime() / 1000) + 10 * 60;

    const [type, tokenA, tokenB, tokenAMinAmount, tokenBMinAmount] = tokenSwitch(
      token0!,
      token1!,
      parseUnits(new Decimal(token0Value).times(0.995).toString(), token0!.decimals),
      parseUnits(new Decimal(token1Value).times(0.995).toString(), token1!.decimals)
    );
    let execute = 'removeLiquidity';
    let liquidity = parseUnits(lpAmount, 18);
    let to = account.address;
    let args = [token0!.address, token1!.address, liquidity, tokenAMinAmount, tokenBMinAmount, to, deadline];
    if (type === CurrencyPairType.EthAndToken) {
      execute = 'removeLiquidityETH';
      args = [(tokenB as Token).address, liquidity, tokenAMinAmount, tokenBMinAmount, to, deadline];
    } else if (type === CurrencyPairType.EthAndUsdb) {
      execute = 'removeLiquidityETHAndUSDB';
      args = [liquidity, tokenAMinAmount, tokenBMinAmount, to, deadline];
    } else if (type === CurrencyPairType.UsdbAndToken) {
      execute = 'removeLiquidityUSDB';
      args = [(tokenB as Token).address, liquidity, tokenAMinAmount, tokenBMinAmount, to, deadline];
    }

    // @ts-ignore
    const data = await writeContract(
      ContractName.SWAP_ROUTER,
      {
        actionTitle: 'Remove Liquidity',
      },
      execute,
      // @ts-ignore
      args,
      {
        account,
      }
    );
    if (data && data.status === 'success') {
      // console.log(data.logs);

      const log = parseTokenTransferLogs(data.logs);
      const adressSymbolMap = {
        [token0!.address.toLocaleLowerCase()]: {
          symbol: token0!.symbol,
          decimal: token0?.decimals || 18,
        },
        [token1!.address.toLocaleLowerCase()]: {
          symbol: token1!.symbol,
          decimal: token1?.decimals || 18,
        },
      } as Record<string, { symbol: string; decimal: number }>;
      const receivesText = Object.entries(log.to[account.address!])
        .map((item) => {
          return `${formatUnits(item[1], adressSymbolMap[item[0]].decimal)} ${adressSymbolMap[item[0]].symbol}`;
        })
        .join(', ');
      toast({
        title: 'Withdraw finished',
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
    setLoading(false);
  }

  return (
    <Container w={'420px'} borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md" p={6} mt="24">
      <Center mb={'2rem'}>
        <Text fontSize="md">Liquidity Withdraw</Text>
      </Center>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderBottomRadius={'0'}>
        <Flex>
          <Center>
            <TokenSelect token={token0} isDisabled={true} onSelect={() => {}} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="sm" textAlign={'right'} placeholder="0" disabled color={'#fff'} value={token0Value} />
          </Center>
        </Flex>
      </Container>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
        <Flex>
          <Center>
            <TokenSelect isDisabled={true} token={token1} onSelect={() => {}} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="sm" textAlign={'right'} placeholder="0" isDisabled value={token1Value} />
          </Center>
        </Flex>
      </Container>
      <Box position="relative" padding="10">
        <Divider colorScheme={'whiteAlpha'} />
        <AbsoluteCenter bg="#0d0703" px="4">
          Input Your LP Token
        </AbsoluteCenter>
      </Box>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
        <Flex>
          <Center textAlign={'center'} width={'180px'}>
            <Text mr="14px">OUTRUN-LP</Text>
            <Divider orientation="vertical" height={'20px'} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="lg" textAlign={'right'} value={lpAmount} placeholder="withdraw amount" onChange={(e) => handleLpAmount(e.target.value)} />
          </Center>
        </Flex>
      </Container>
      <Center mt="16px">
        <Slider aria-label="slider-ex-4" width={'98%'} value={sliderValue} onChange={(val) => setSliderValue(val)}>
          <SliderMark value={sliderValue} textAlign="center" fontSize={'12px'} bg="teal" color="white" mt="-8" ml="-5" w="12">
            {sliderValue}%
          </SliderMark>
          <SliderTrack bg="teal">
            <SliderFilledTrack bg="teal" />
          </SliderTrack>
          <SliderThumb boxSize={3}></SliderThumb>
        </Slider>
      </Center>
      <br />
      <HStack fontSize={'small'} px="8px">
        <Text w="40%">Your Total Shares</Text>
        <Text w="70%" textAlign={'right'}>
          {get(userLiquidityPosition, '[0].liquidityTokenBalance', 0)}
        </Text>
      </HStack>
      <Box mt={'1rem'} fontSize={16}>
        {action === BtnAction.disconnect ? <w3m-button /> : null}
        {action === BtnAction.available ? (
          <Button width={'100%'} mt={4} size="lg" colorScheme="gray" variant="solid" onClick={removeLiquidity} isLoading={loading}>
            remove liquidity
          </Button>
        ) : null}
        {action === BtnAction.disable ? (
          <Button width={'100%'} mt={4} disabled size="lg" isDisabled colorScheme="gray" variant="solid">
            remove liquidity
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
