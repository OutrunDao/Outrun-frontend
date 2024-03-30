'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import TokenSelect, { getToken } from '@/components/TokenSelect';
import { useEffect, useMemo, useState } from 'react';
import { TokenInfo } from '@uniswap/token-lists';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { TradeSettingsModal } from './TradeSettingsModal';
import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useSwap } from '@/hook/useSwap';
import { Trade } from '@/packages/swap-sdk';
import tokenSwitch, { CurrencyPairType } from '../pool/tokenSwitch';
import { getRouterContract } from '../pool/getContract';
import { Percent, Token } from '@/packages/swap-core';
import { Router as SwapRouter } from '@/packages/swap-sdk';
const defaultSymbol = 'ETH';

export default function Swap() {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const {
    swapData,
    loading,
    setToken0,
    setToken1,
    setLoading,
    token0AmountInputHandler,
    token1AmountInputHandler,
    approve,
  } = useSwap(true);

  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
  };

  async function swap() {
    if (!swapData.token0 || !swapData.token1 || !account.address || !walletClient) return;
    setLoading(true);
    const { methodName, args, value } = SwapRouter.swapCallParameters(swapData.tradeRoute!, {
      allowedSlippage: new Percent(5, 100),
      deadline: Math.floor(new Date().getTime() / 1000) + 5 * 60,
      recipient: account.address,
    });
    try {
      const tx = await getRouterContract(walletClient!).write[methodName](args, { value, account });
      toast({
        title: 'transaction success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const data = await publicClient!.waitForTransactionReceipt({
        hash: tx as Address,
        confirmations: 1,
      });
      toast({
        title: data.status === 'success' ? 'Add liquidity success' : 'Add liquidity failed',
        status: data.status === 'success' ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Add liquidity failed',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  return (
    <Container
      w={'480px'}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderRadius={'md'}
      borderColor={'#3aaa7a'}
      textColor={'#fff'}
      padding={'2rem'}
      textAlign={'center'}
      mt={'6rem'}
    >
      <Heading as="h3" size="lg" fontWeight={''}>
        SWAP
      </Heading>
      <Container textAlign={'right'}>
        <TradeSettingsModal></TradeSettingsModal>
      </Container>
      <VStack mt={'2.5rem'} spacing={4} paddingX={'2rem'} fontSize={16}>
        <InputGroup>
          <Text color={'#3aaa7a'} ml={4} mt={'6px'}>
            INPUT:{' '}
          </Text>
          <Input
            variant="unstyled"
            size="lg"
            placeholder="Intput token amount"
            ml={4}
            mr={6}
            value={swapData.token0AmountInput}
            onChange={(e) => token0AmountInputHandler(e.target.value)}
          />
          <TokenSelect
            defaultSymbol={defaultSymbol}
            token={swapData.token0}
            chainId={chainId}
            onSelect={(token) => setToken0(token)}
          />
          <br />
        </InputGroup>
        <Container textAlign={'right'} pr={0}>
          <Text fontSize={'xs'}>Balance: {swapData.token0Balance.toFixed(6)}</Text>
        </Container>
        <Container>
          <IconButton
            icon={<ArrowDownIcon />}
            colorScheme="teal"
            aria-label="ArrowDown"
            onClick={onReverse}
          />
        </Container>
        <InputGroup>
          <Text color={'#3aaa7a'} mt={'6px'}>
            OUTPUT:{' '}
          </Text>
          <Input
            variant="unstyled"
            size="lg"
            placeholder="Output token amount"
            ml={4}
            mr={6}
            value={swapData.token1AmountInput}
            onChange={(e) => token1AmountInputHandler(e.target.value)}
          />
          <TokenSelect chainId={chainId} token={swapData.token1} onSelect={(token) => setToken1(token)} />
        </InputGroup>
        <Container textAlign={'right'} pr={0}>
          <Text fontSize={'xs'}>Balance: {swapData.token1Balance.toFixed(6)}</Text>
        </Container>
        <Container textAlign={'right'} pr={0}>
          {swapData.pair ? (
            <Text fontSize={'xs'}>
              1{swapData.pair.token1.symbol} = {swapData.pair.token1Price.toFixed(6)}{' '}
              {swapData.pair.token0.symbol}
              <br />1{swapData.pair.token0.symbol} = {swapData.pair.token0Price.toFixed(6)}{' '}
              {swapData.pair.token1.symbol}
            </Text>
          ) : null}
        </Container>

        {swapData.token1 &&
        swapData.token0AmountInput &&
        swapData.token1AmountInput &&
        swapData.token0 &&
        (swapData.tokenAllowance[0].lessThan(swapData.token0AmountInput) ||
          swapData.tokenAllowance[1].lessThan(swapData.token1AmountInput)) ? (
          <Button width={'100%'} mt={4} size="lg" variant="custom" onClick={approve} isLoading={loading}>
            Set Approve{' '}
            {swapData.tokenAllowance[0].lessThan(swapData.token0AmountInput || 0)
              ? swapData.token0.symbol
              : swapData.token1.symbol}
          </Button>
        ) : (swapData.token0AmountInput && swapData.token0Balance.lt(swapData.token0AmountInput)) ||
          (swapData.token1AmountInput && swapData.token1Balance.lt(swapData.token1AmountInput)) ? (
          <Button width={'100%'} mt={4} size="lg" variant="custom">
            {' '}
            insufficient token{' '}
          </Button>
        ) : (
          <Button width={'100%'} mt={4} size="lg" variant="custom" onClick={swap} isLoading={loading}>
            swap
          </Button>
        )}
      </VStack>
    </Container>
  );
}
