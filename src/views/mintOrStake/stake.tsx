'use client';

import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import TokenSelect from '@/components/TokenSelect';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseEther, parseEventLogs, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import { Currency, Ether, Percent, Token, TradeType } from '@/packages/swap-core';
import { get, retry } from 'radash';
import { useEffect, useMemo, useState } from 'react';
import useContract from '@/hook/useContract';
import { addressMap, ContractName } from '@/contracts/addressMap';
import { BlockExplorers } from '@/contracts/chains';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import getORETH from '@/contracts/get/oreth';
import { USDB } from '@/contracts/usdb';
import getORUSD from '@/contracts/get/orusd';
import { currencyStakePageSelectList, currencyStakePageSelectList2 } from '@/contracts/currencys';
import { RETH } from '@/contracts/reth';
import { RUSD } from '@/contracts/rusd';
import { OSETH } from '@/contracts/oseth';
import { OSUSD } from '@/contracts/osusd';
import { useQuery } from '@tanstack/react-query';
import getOrethStake from '@/contracts/get/orethStakeManager';
import getOrUsdStake from '@/contracts/get/orusdStakeManager';
import Decimal from 'decimal.js-light';

export default function Stake() {
  const chainId = useChainId();
  const account = useAccount();
  const toast = useToast();
  const { open } = useWeb3Modal();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [sliderValue, setSliderValue] = useState(100);

  const { write: writeContract, loading: routerContractLoading } = useContract();
  const { swapData, loading, setToken0, setToken1, setLoading, approveTokens, token0AmountInputHandler, updateTokenBalance, token1AmountInputHandler, setSlippage, maxHandler } = useSwap({
    view: SwapView.mint,
    approve2Tokens: false,
  });
  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);
  const title = useMemo(() => {
    if (!swapData.token0) return 'Choose Token';
    if (swapData.token0.equals(RETH[chainId])) {
      return 'Stake orETH';
    } else if (swapData.token0.equals(RUSD[chainId])) {
      return 'Stake orUSD';
    }
  }, [swapData.token0, chainId]);
  const yieldAmount = useMemo(() => {
    if (!sliderValue || !swapData.token0AmountInput) return 0;
    return new Decimal(sliderValue).mul(swapData.token0AmountInput).toString();
  }, [sliderValue, swapData.token0AmountInput]);
  const yieldTokenSymbol = useMemo(() => {
    if (swapData.token0?.equals(RETH[chainId])) return 'REY';
    if (swapData.token0?.equals(RUSD[chainId])) return 'RUY';
    return '';
  }, [swapData.token0]);
  const { data: exchangeRate } = useQuery({
    queryKey: ['calc-stake-exchangerate', swapData.token0, publicClient?.chain.id],
    queryFn: async () => {
      if (!publicClient) return 0;
      if (swapData.token0?.equals(RETH[chainId])) {
        let result = await getOrethStake(chainId, publicClient).read['calcOSETHAmount']([parseUnits('1', 18)]);
        return formatUnits(result as bigint, 18);
      }
      if (swapData.token0?.equals(RUSD[chainId])) {
        let result = await getOrUsdStake(chainId, publicClient).read['calcOSUSDAmount']([parseUnits('1', 18)]);
        return formatUnits(result as bigint, 18);
      }
      return 0;
    },
  });
  useEffect(() => {
    setToken0(RETH[chainId]);
    setToken1(OSETH[chainId]);
  }, [chainId]);
  useEffect(() => {
    let output = '';
    if (!swapData.token0AmountInput || isNaN(+swapData.token0AmountInput)) {
      output = '';
    } else if (exchangeRate) {
      output = new Decimal(swapData.token0AmountInput).mul(exchangeRate).toString();
    }
    token1AmountInputHandler(output);
  }, [swapData.token0AmountInput, exchangeRate]);

  function onSelectToken0(token: Currency) {
    setToken0(token);
    if (token.equals(RETH[chainId])) {
      setToken1(OSETH[chainId]);
    } else if (token.equals(RUSD[chainId])) {
      setToken1(OSUSD[chainId]);
    }
  }

  async function stake() {
    if (!swapData.token0 || !swapData.token1 || !account.address) return;
    setLoading(true);
    let data;
    if (swapData.token0.equals(RETH[chainId])) {
      if (+swapData.token0AmountInput < 0.0001)
        return toast({
          title: 'mint stake amount 0.001 orETH',
          status: 'error',
        });
      await approveTokens(addressMap[chainId].ORETH_STAKE);
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'stake orEth',
        },
        'stake',
        [parseUnits(swapData.token0AmountInput, 18), +sliderValue, account.address, account.address, account.address],
        {
          account,
        }
      );
    } else {
      if (+swapData.token0AmountInput < 1)
        return toast({
          title: 'mint stake amount 1 orUSD',
          status: 'error',
        });
      await approveTokens(addressMap[chainId].ORUSD_STAKE);
      data = await writeContract(
        // @ts-ignore
        getOrUsdStake(chainId, publicClient!, walletClient),
        {
          actionTitle: 'stake orUSD',
        },
        'stake',
        [parseUnits(swapData.token0AmountInput, 18), +sliderValue, account.address, account.address, account.address],
        {
          account,
        }
      );
    }

    setLoading(false);
  }

  return (
    <Container borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md" p={6}>
      {/* <Flex mb={'4px'}>
        <Center>
          <Text fontSize="sm" mb={2}>
            Stake orETH/orUSD
          </Text>
        </Center>
        <Spacer></Spacer>
      </Flex> */}
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderBottomRadius={'0'}>
        <Flex>
          <Center>
            <TokenSelect hiddenSearchInput tokenList={currencyStakePageSelectList} token={swapData.token0} tokenDisable={swapData.token1} onSelect={onSelectToken0} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="lg" textAlign={'right'} placeholder="Intput token amount" value={swapData.token0AmountInput} onChange={(e) => token0AmountInputHandler(e.target.value)} />
          </Center>
        </Flex>
        <Flex>
          <Center ml={'14px'}>
            <Text fontSize={'xs'}>Balance: {swapData.token0Balance.toFixed(6)}</Text>
            {swapData.token0Balance.gt(0) ? (
              <Button colorScheme="teal" variant="link" size={'xs'} ml={'6px'} textDecoration={'underline'} onClick={() => maxHandler(0)}>
                MAX
              </Button>
            ) : null}
          </Center>
        </Flex>
      </Container>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
        <Flex>
          <Center>
            <TokenSelect hiddenSearchInput isDisabled tokenList={currencyStakePageSelectList2} token={swapData.token1} onSelect={() => {}} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="lg" readOnly textAlign={'right'} placeholder="Output token amount" value={swapData.token1AmountInput} />
          </Center>
        </Flex>
        <Flex>
          <Center ml={'14px'}>
            <Text fontSize={'xs'}>Balance: {swapData.token1Balance.toFixed(6)}</Text>
          </Center>
        </Flex>
      </Container>
      <Box position="relative" padding="6">
        <Divider colorScheme={'whiteAlpha'} />
        <AbsoluteCenter bg="#0d0703" px="4" fontSize={14}>
          LOCK PERIOD
        </AbsoluteCenter>
      </Box>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
        <Flex>
          <Center textAlign={'center'} width={'100px'}>
            <Text mr="14px">days</Text>
            <Divider orientation="vertical" height={'20px'} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="sm" textAlign={'right'} value={sliderValue} placeholder="withdraw amount" onChange={(e) => setSliderValue(+e.target.value)} />
          </Center>
        </Flex>
      </Container>
      <Center mt="16px">
        <Slider aria-label="slider-ex-4" width={'98%'} value={sliderValue} onChange={(val) => setSliderValue(val)} min={7} max={365} step={1}>
          {/* <SliderMark value={7} mt="1" ml="-2.5" fontSize="sm">
            7
          </SliderMark>
          <SliderMark value={14} mt="1" ml="-2.5" fontSize="sm">
            14
          </SliderMark>
          <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
            50
          </SliderMark>
          <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
            75
          </SliderMark> */}
          {/* <SliderMark value={sliderValue} textAlign="center" fontSize={'12px'} bg="teal" color="white" mt="-8" ml="-5" w="12">
            {sliderValue}
          </SliderMark> */}
          <SliderTrack bg="teal">
            <SliderFilledTrack bg="teal" />
          </SliderTrack>
          <SliderThumb boxSize={3}></SliderThumb>
        </Slider>
      </Center>
      {/* <br /> */}
      {/* <Center>
        <Text fontSize={13} color="gray" my={2}>
          Your lock end date will be 2028年4月06日周四 GMT+8 08:00
        </Text>
      </Center> */}
      <HStack fontSize={'small'} px="8px" py={1} color={'brand.500'} fontWeight={'bold'}>
        <Text w="40%">Received YieldToken</Text>
        <Text w="70%" textAlign={'right'}>
          {yieldAmount} {yieldTokenSymbol}
        </Text>
      </HStack>
      {swapData.token0 && swapData.token1 ? (
        <HStack fontSize={'small'} px="8px" py={1} color={'green'}>
          <Text w="40%">Exchange Rate</Text>
          <Text w="70%" textAlign={'right'}>
            1{swapData.token0!.symbol} = {exchangeRate} {swapData.token1!.symbol}
          </Text>
        </HStack>
      ) : null}

      {/* {swapData.priceImpact && +swapData.priceImpact >= 20 ? (
        <Box textAlign={'center'} mt={2} fontSize={'x-small'} color={'brand.500'}>
          <Text>This swap has a price impact of large than 20% !! </Text>
        </Box>
      ) : null} */}
      <Box mt={'1rem'} fontSize={16}>
        {swapData.submitButtonStatus === BtnAction.insufficient ? (
          <Button width={'100%'} size="lg" colorScheme="gray" variant="solid">
            {' '}
            insufficient token{' '}
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.disconnect ? (
          <Button width={'100%'} size="lg" colorScheme="gray" variant="solid" onClick={() => open({ view: 'Connect' })}>
            connect to wallet
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.available ? (
          <Button width={'100%'} size="lg" margin={0} colorScheme="gray" variant="solid" onClick={stake} isLoading={loading}>
            {title}
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.disable ? (
          <Button width={'100%'} size="lg" margin={0} colorScheme="gray" variant="solid" isDisabled>
            {title}
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
