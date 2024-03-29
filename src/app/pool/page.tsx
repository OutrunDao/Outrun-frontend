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
} from '@chakra-ui/react';
import TokenSelect, { getToken } from '@/components/TokenSelect';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';

import { getRouterContract } from './getContract';
import UserLiquiditesPannel from './UserLiquidityPannel';
import { useSwap } from '@/hook/useSwap';
import { Currency, Token } from '@/packages/swap-core';

const defaultSymbol = 'WETH';

function isNative(token0: Currency, token1: Currency) {
  return token0;
}

const PoolIndex = () => {
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
  } = useSwap(false);

  async function _addLiquidity() {
    if (!swapData.token0 || !swapData.token1 || !account.address || !walletClient) return;
    setLoading(true);
    const slippage = 0.05;
    let execution = 'addLiquidity';
    let token0Input = parseUnits(swapData.token0AmountInput!, swapData.token0.decimals);
    let token1Input = parseUnits(swapData.token1AmountInput!, swapData.token1.decimals);
    let token0AmountMin = parseUnits(
      (+swapData.token0AmountInput! * slippage).toString(),
      swapData.token0.decimals
    );
    let token1AmountMin = parseUnits(
      (+swapData.token1AmountInput! * slippage).toString(),
      swapData.token1.decimals
    );
    let deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    let to = account.address;
    let args: (string | number | bigint)[] = [
      (swapData.token0 as Token).address,
      (swapData.token1 as Token).address,
      token0Input,
      token1Input,
      token0AmountMin,
      token1AmountMin,
      to,
      deadline,
    ];
    let config;
    if (
      (swapData.token0.isNative && swapData.token1.symbol === 'USDB') ||
      (swapData.token0.symbol === 'USDB' && swapData.token1.isNative)
    ) {
      execution = 'addLiquidityETHAndUSDB';
      args = swapData.token0.isNative
        ? [token1Input, token0AmountMin, token1AmountMin, to, deadline]
        : [token0Input, token1AmountMin, token0AmountMin, to, deadline];
      config = { value: swapData.token0.isNative ? token0Input : token1Input, account };
    } else if (swapData.token0.isNative || swapData.token1.isNative) {
      execution = 'addLiquidityETH';
      let token = (swapData.token0.isNative ? swapData.token1 : swapData.token0) as Token;
      args = [
        token.address,
        token.equals(swapData.token0) ? token0Input : token1Input,
        token.equals(swapData.token0) ? token0AmountMin : token1AmountMin,
        token.equals(swapData.token0) ? token1AmountMin : token0AmountMin,
        to,
        deadline,
      ];
      config = { value: token.equals(swapData.token0) ? token1Input : token0Input, account };
    } else if (swapData.token0.symbol === 'USDB' || swapData.token1.symbol === 'USDB') {
      // todo 不用名称判断
      execution = 'addLiquidityUSDB';
      let [usdbToken, token] =
        swapData.token0.symbol === 'USDB'
          ? [swapData.token0, swapData.token1]
          : [swapData.token1, swapData.token0];
      let [amountTokenDesired, amountUSDBDesired, amountTokenMin, amountUSDBMin] =
        swapData.token0.symbol === 'USDB'
          ? [token0Input, token1Input, token0AmountMin, token1AmountMin]
          : [token1Input, token0Input, token1AmountMin, token0AmountMin];
      args = [token.address, amountTokenDesired, amountUSDBDesired, amountTokenMin, amountUSDBMin];
    }

    try {
      const tx = await getRouterContract(walletClient!).write[execution](args, config);
      toast({
        title: 'transaction success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const data = await publicClient!.waitForTransactionReceipt({
        hash: tx as Address,
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
    <>
      <UserLiquiditesPannel />
      <Container
        w={'480px'}
        borderStyle={'solid'}
        borderWidth={'1px'}
        borderRadius={'md'}
        borderColor={'#D3027D'}
        textColor={'#fff'}
        padding={'2rem'}
        textAlign={'center'}
        mt={'6rem'}
      >
        <Heading as="h3" size="lg" fontWeight={''}>
          POOL
        </Heading>

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
            <TokenSelect defaultSymbol="WETH" chainId={chainId} onSelect={(token) => setToken0(token)} />
            <br />
          </InputGroup>
          <Container textAlign={'right'} pr={0}>
            <Text fontSize={'xs'}>Balance: {swapData.token0Balance.toFixed(6)}</Text>
          </Container>
          <Container>
            <IconButton icon={<ArrowDownIcon />} colorScheme="teal" aria-label="ArrowDown" />
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
            <TokenSelect chainId={chainId} onSelect={(token) => setToken1(token)} />
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
            <Button
              width={'100%'}
              mt={4}
              size="lg"
              variant="custom"
              onClick={_addLiquidity}
              isLoading={loading}
            >
              Add Liquidity
            </Button>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default PoolIndex;
