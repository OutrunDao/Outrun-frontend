'use client';

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import TokenSelect, { getToken } from '@/components/TokenSelect';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import { getRouterContract } from '../getContract';
import { Percent } from '@/packages/swap-core';
import { retry } from 'radash';
import { Token } from '@/packages/swap-core';
import tokenSwitch, { CurrencyPairType } from '../tokenSwitch';

const defaultSymbol = 'ETH';

export default function AddLiquidity() {
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
  } = useSwap(SwapView.addLiquidity);

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
    <Container
      w={'420px'}
      borderStyle={'solid'}
      borderWidth={'0.5px'}
      borderRadius={'md'}
      borderColor="gray.600"
      boxShadow="xs"
      rounded="md"
      p={6}
      mt="24"
    >
      <Center mb={'2rem'}>
        <Text fontSize="md">Add Liquidity</Text>
      </Center>
      <Container
        borderColor="gray.600"
        boxShadow="xs"
        rounded="md"
        borderWidth={'0.5px'}
        borderStyle={'solid'}
        padding="6px 0"
        borderBottomRadius={'0'}
      >
        <Flex>
          <Center>
            <TokenSelect
              defaultSymbol={defaultSymbol}
              token={swapData.token0}
              chainId={chainId}
              onSelect={(token) => setToken0(token)}
            />
          </Center>
          <Center width={'100%'}>
            <Input
              variant="main"
              size="lg"
              textAlign={'right'}
              placeholder="Input token amount"
              value={swapData.token0AmountInput}
              onChange={(e) => token0AmountInputHandler(e.target.value)}
            />
          </Center>
        </Flex>
        <Flex>
          <Center ml={'14px'}>
            <Text fontSize={'xs'}>Balance: {swapData.token0Balance.toFixed(6)}</Text>
            <Button colorScheme="teal" variant="link" size={'xs'} ml={'6px'} textDecoration={'underline'}>
              MAX
            </Button>
          </Center>
        </Flex>
      </Container>
      <Container
        borderColor="gray.600"
        boxShadow="xs"
        rounded="md"
        borderWidth={'0.5px'}
        borderStyle={'solid'}
        padding="6px 0"
        borderTopRadius={0}
      >
        <Flex>
          <Center>
            <TokenSelect chainId={chainId} token={swapData.token1} onSelect={(token) => setToken1(token)} />
          </Center>
          <Center width={'100%'}>
            <Input
              variant="main"
              size="lg"
              textAlign={'right'}
              placeholder="token amount"
              value={swapData.token1AmountInput}
              onChange={(e) => token1AmountInputHandler(e.target.value)}
            />
          </Center>
        </Flex>
        <Flex>
          <Center ml={'14px'}>
            <Text fontSize={'xs'}>Balance: {swapData.token1Balance.toFixed(6)}</Text>
            <Button colorScheme="teal" variant="link" size={'xs'} ml={'6px'} textDecoration={'underline'}>
              MAX
            </Button>
          </Center>
        </Flex>
      </Container>
      <br />
      <HStack fontSize={'small'} px="8px">
        <Text w="40%">Exchange rate</Text>
        <Text w="70%" textAlign={'right'}>
          {swapData.pair ? (
            <>
              1{swapData.pair.token0.symbol} = {swapData.pair.token0Price.toFixed(6)}{' '}
              {swapData.pair.token1.symbol}
            </>
          ) : null}
        </Text>
      </HStack>
      <Box mt={'1rem'} fontSize={16}>
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
            colorScheme="gray"
            variant="solid"
            onClick={_addLiquidity}
            isLoading={loading}
          >
            add liquidity
          </Button>
        ) : null}
        {swapData.action === BtnAction.disable ? (
          <Button width={'100%'} mt={4} disabled size="lg" colorScheme="gray" variant="solid">
            add liquidity
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
