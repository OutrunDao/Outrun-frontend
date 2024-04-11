'use client';

import {
  Box,
  Button,
  Center,
  Container,
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
  Spacer,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import TokenSelect, { getToken } from '@/components/TokenSelect';
import { ArrowDownIcon, ReactIcon, RepeatIcon } from '@chakra-ui/icons';
import { TradeOptionsPopover } from './TradeOptionsPopover';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import { getRouterContract } from '@/views/pool/getContract';
import { Percent, Token } from '@/packages/swap-core';
import { Router as SwapRouter } from '@/packages/swap-sdk';
import { retry } from 'radash';
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
    maxHandler,
  } = useSwap(SwapView.swap);

  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
    token0AmountInputHandler(swapData.token1AmountInput);
    token1AmountInputHandler(swapData.token0AmountInput);
  };

  async function swap() {
    if (!swapData.token0 || !swapData.token1 || !account.address || !walletClient) return;
    setLoading(true);
    const { methodName, args, value } = SwapRouter.swapCallParameters(swapData.tradeRoute!, {
      allowedSlippage: new Percent(5, 100),
      deadline: Math.floor(new Date().getTime() / 1000) + 5 * 60,
      recipient: account.address,
    });
    let toastCurrent = toast({
      status: 'loading',
      title: 'submiting transaction',
      description: 'please wait...',
      duration: null,
      isClosable: true,
    });
    try {
      const tx = await getRouterContract(walletClient!).write[methodName](args, { value, account });
      toast.update(toastCurrent, {
        title: 'transaction submited',
        description: 'Waiting for block confirmation',
      });
      const data = await retry({ times: 20, delay: 5000 }, async () => {
        return await publicClient!.getTransactionReceipt({
          hash: tx as Address,
        });
      });
      toast.update(toastCurrent, {
        title: data.status === 'success' ? 'swap success' : 'swap failed',
        status: data.status === 'success' ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });
    } catch (e: any) {
      toast.closeAll();
      toast({
        title: 'swap failed',
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
      <Flex mb={'4px'}>
        <Center>
          <Text fontSize="md">Swap</Text>
        </Center>
        <Spacer></Spacer>
        <TradeOptionsPopover></TradeOptionsPopover>
      </Flex>
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
              tokenDisable={swapData.token1}
              onSelect={(token) => setToken0(token)}
            />
          </Center>
          <Center width={'100%'}>
            <Input
              variant="main"
              size="lg"
              textAlign={'right'}
              isDisabled={!swapData.pair}
              placeholder="Intput token amount"
              value={swapData.token0AmountInput}
              onChange={(e) => token0AmountInputHandler(e.target.value)}
            />
          </Center>
        </Flex>
        <Flex>
          <Center ml={'14px'}>
            <Text fontSize={'xs'}>Balance: {swapData.token0Balance.toFixed(6)}</Text>
            {swapData.token0Balance.gt(0) ? (
              <Button
                colorScheme="teal"
                variant="link"
                size={'xs'}
                ml={'6px'}
                textDecoration={'underline'}
                onClick={() => maxHandler(0)}
              >
                MAX
              </Button>
            ) : null}
          </Center>
        </Flex>
      </Container>
      <Box position={'relative'}>
        <IconButton
          textAlign={'center'}
          position={'absolute'}
          top={'-12px'}
          left={'48%'}
          icon={<RepeatIcon />}
          color="gray.500"
          borderColor="gray.500"
          variant={'outline'}
          aria-label="ArrowDown"
          onClick={onReverse}
          bg={'#0d0703'}
          size={'xs'}
        />
      </Box>
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
            <TokenSelect
              tokenDisable={swapData.token0}
              chainId={chainId}
              token={swapData.token1}
              onSelect={(token) => setToken1(token)}
            />
          </Center>
          <Center width={'100%'}>
            <Input
              variant="main"
              size="lg"
              textAlign={'right'}
              isDisabled={!swapData.pair}
              placeholder="Output token amount"
              value={swapData.token1AmountInput}
              onChange={(e) => token1AmountInputHandler(e.target.value)}
            />
          </Center>
        </Flex>
        <Flex>
          <Center ml={'14px'}>
            <Text fontSize={'xs'}>Balance: {swapData.token1Balance.toFixed(6)}</Text>
            {swapData.token1Balance.gt(0) ? (
              <Button
                colorScheme="teal"
                variant="link"
                size={'xs'}
                ml={'6px'}
                textDecoration={'underline'}
                onClick={() => maxHandler(1)}
              >
                MAX
              </Button>
            ) : null}
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
      <HStack fontSize={'small'} px="8px" py={2}>
        <Text w="40%">Gas fee</Text>
        <Text w="70%" textAlign={'right'}>
          {'< '}-- Gwei
        </Text>
      </HStack>
      <HStack fontSize={'small'} px="8px" py={1} color={'green'}>
        <Text w="40%">Minimal Receive</Text>
        <Text w="70%" textAlign={'right'}>
          --
        </Text>
      </HStack>
      <HStack fontSize={'small'} px="8px" py={1} color={'green'}>
        <Text w="40%">PriceImpact</Text>
        <Text w="70%" textAlign={'right'}>
          ---
        </Text>
      </HStack>
      {!swapData.pair && swapData.token0 && swapData.token1 ? (
        <Box textAlign={'center'} fontSize={'x-small'} color={'brand.500'}>
          <Text>This pool is not exists yet, you can create pool </Text>
          <Link href={`/pool/create`} textDecoration={'underline'}>
            Here
          </Link>
        </Box>
      ) : null}
      <Box mt={'1rem'} fontSize={16}>
        {swapData.action === BtnAction.approve ? (
          <Button
            width={'100%'}
            size="lg"
            colorScheme="gray"
            variant="solid"
            onClick={approve}
            isLoading={loading}
          >
            Set Approve{' '}
            {swapData.tokenAllowance[0].lessThan(swapData.token0AmountInput || 0)
              ? swapData.token0.symbol
              : swapData.token1!.symbol}
          </Button>
        ) : null}
        {swapData.action === BtnAction.insufficient ? (
          <Button width={'100%'} size="lg" colorScheme="gray" variant="solid">
            {' '}
            insufficient token{' '}
          </Button>
        ) : null}
        {swapData.action === BtnAction.disconnect ? <w3m-button /> : null}
        {swapData.action === BtnAction.available ? (
          <Button
            width={'100%'}
            size="lg"
            margin={0}
            colorScheme="gray"
            variant="solid"
            onClick={swap}
            isDisabled={!swapData.pair}
            isLoading={loading}
          >
            swap
          </Button>
        ) : null}
        {swapData.action === BtnAction.disable ? (
          <Button width={'100%'} isDisabled size="lg" colorScheme="gray" variant="solid" rounded={'md'}>
            swap
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
