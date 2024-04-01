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
import { useSwap, BtnAction } from '@/hook/useSwap';
import { Currency, Token } from '@/packages/swap-core';
import tokenSwitch, { CurrencyPairType } from './tokenSwitch';
import { retry } from 'radash';
const defaultSymbol = 'WETH';

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
    toast({
      status: 'loading',
      title: 'addLiquidity',
      isClosable: true,
    });
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
    // 计算最小输出逻辑应该不对,待改
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
    const [type, tokenA, tokenB, tokenAInput, tokenBInput, tokenAMin, tokenBMin] = tokenSwitch(
      swapData.token0,
      swapData.token1,
      token0Input,
      token1Input,
      token0AmountMin,
      token1AmountMin
    );
    // console.log(type, tokenA, tokenB, tokenAInput, tokenBInput, tokenAMin, tokenBMin);
    if (type === CurrencyPairType.EthAndUsdb) {
      execution = 'addLiquidityETHAndUSDB';
      args = [tokenBInput!, tokenAMin!, tokenBMin!, to, deadline];
      config = { value: tokenAInput, account };
    } else if (type === CurrencyPairType.EthAndToken) {
      execution = 'addLiquidityETH';
      args = [(tokenB as Token).address, tokenBInput!, tokenAMin!, tokenBMin!, to, deadline];
      config = { value: tokenAInput, account };
    } else if (type === CurrencyPairType.UsdbAndToken) {
      execution = 'addLiquidityUSDB';
      args = [(tokenB as Token).address, tokenBInput!, tokenAInput!, tokenBMin!, tokenAMin!, to, deadline];
    }

    try {
      const tx = await getRouterContract(walletClient!).write[execution](args, config);
      toast({
        title: 'transaction success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const data = await retry({ times: 10, delay: 5000 }, async () => {
        return await publicClient!.getTransactionReceipt({
          hash: tx as Address,
        });
      });
      console.log(data);
      toast({
        title: data.status === 'success' ? 'Add liquidity success' : 'Add liquidity failed',
        status: data.status === 'success' ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });
    } catch (e: any) {
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

          {swapData.action === BtnAction.approve ? (
            <Button width={'100%'} mt={4} size="lg" variant="custom" onClick={approve} isLoading={loading}>
              Set Approve{' '}
              {swapData.tokenAllowance[0].lessThan(swapData.token0AmountInput || 0)
                ? swapData.token0.symbol
                : swapData.token1!.symbol}
            </Button>
          ) : null}
          {swapData.action === BtnAction.insufficient ? (
            <Button width={'100%'} mt={4} size="lg" variant="custom">
              {' '}
              insufficient token{' '}
            </Button>
          ) : null}
          {swapData.action === BtnAction.disconnect ? <w3m-button /> : null}
          {swapData.action === BtnAction.available ? (
            <Button
              width={'100%'}
              mt={4}
              size="lg"
              variant="custom"
              onClick={_addLiquidity}
              isLoading={loading}
            >
              add liquidity
            </Button>
          ) : null}
          {swapData.action === BtnAction.disable ? (
            <Button width={'100%'} mt={4} disabled size="lg" variant="custom">
              add liquidity
            </Button>
          ) : null}
        </VStack>
      </Container>
    </>
  );
};

export default PoolIndex;
