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
import { Address, formatUnits, getAddress, parseEventLogs, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import { getRouterContract } from '@/views/pool/getContract';
import { Percent, Token, TradeType } from '@/packages/swap-core';
import { Router as SwapRouter } from '@/packages/swap-sdk';
import { get, retry } from 'radash';
import { useState } from 'react';
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
    setSlippage,
    approve,
    maxHandler,
  } = useSwap(SwapView.swap);
  const [slippageTolerance, setSlippageTolerance] = useState(2);
  const [deadlineInput, setDeadlineInput] = useState(10);
  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
    token0AmountInputHandler('');
    token1AmountInputHandler('');
  };

  async function swap() {
    if (!swapData.token0 || !swapData.token1 || !account.address || !walletClient) return;
    setLoading(true);
    const isExactInput = swapData.tradeRoute?.tradeType === TradeType.EXACT_INPUT;
    const { methodName, args, value } = SwapRouter.swapCallParameters(
      isExactInput ? swapData.token0 : swapData.token1,
      isExactInput ? swapData.token1 : swapData.token0,
      swapData.tradeRoute!,
      {
        allowedSlippage: new Percent(slippageTolerance, 100),
        deadline: Math.floor(new Date().getTime() / 1000) + deadlineInput * 60,
        recipient: account.address,
      }
    );
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
      if (data.status === 'success') {
        const logs = parseEventLogs({
          abi: [
            {
              type: 'event',
              name: 'Transfer',
              inputs: [
                {
                  name: 'from',
                  type: 'address',
                  indexed: true,
                  internalType: 'address',
                },
                {
                  name: 'to',
                  type: 'address',
                  indexed: true,
                  internalType: 'address',
                },
                {
                  name: 'value',
                  type: 'uint256',
                  indexed: false,
                  internalType: 'uint256',
                },
              ],
              anonymous: false,
            },
          ],
          logs: data.logs,
          eventName: 'Transfer',
        });
        const spent = get(logs[0], 'args.value') as bigint;
        const receive = get(logs[1], 'args.value') as bigint;
        if (spent && receive) {
          toast({
            title: 'Swap finished',
            status: 'success',
            position: 'bottom',
            description: `You have successfully swapped ${formatUnits(spent, swapData.token0.decimals)} ${
              swapData.token0.symbol
            } for ${formatUnits(receive, swapData.token1.decimals)} ${swapData.token1.symbol}`,
            duration: null,
            isClosable: true,
          });
        }
      }
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

  function onTradeOptionsHandler(slip: string, deadline: string) {
    setDeadlineInput(+deadline);
    setSlippageTolerance(+slip);
    setSlippage(+slip);
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
        <TradeOptionsPopover onSelect={onTradeOptionsHandler}></TradeOptionsPopover>
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
              1{swapData.token0.symbol} = {swapData.exchangeRate} {swapData.token1!.symbol}
            </>
          ) : null}
        </Text>
      </HStack>
      <HStack fontSize={'small'} px="8px" py={2}>
        <Text w="40%">Exchange Route</Text>
        <Text w="70%" textAlign={'right'}>
          {swapData.tradeRoutePath || '---'}
        </Text>
      </HStack>
      <HStack fontSize={'small'} px="8px" py={1} color={'green'}>
        <Text w="40%">Minimal Receive</Text>
        <Text w="70%" textAlign={'right'}>
          {swapData.minOut}
        </Text>
      </HStack>
      <HStack
        fontSize={'small'}
        px="8px"
        py={1}
        color={swapData.priceImpact && +swapData.priceImpact >= 20 ? 'brand.500' : 'green'}
      >
        <Text w="40%">PriceImpact</Text>
        <Text w="70%" textAlign={'right'}>
          {swapData.priceImpact ? swapData.priceImpact + '%' : '---'}
        </Text>
      </HStack>
      {!swapData.tradeRoute &&
      swapData.token0 &&
      swapData.token1 &&
      swapData.token0AmountInput &&
      swapData.token1AmountInput ? (
        <Box textAlign={'center'} fontSize={'x-small'} color={'brand.500'}>
          <Text>not enough liquidity or cannot find route in this pair </Text>
          {/* <Link href={`/pool/create`} textDecoration={'underline'}>
            Here
          </Link> */}
        </Box>
      ) : null}
      {/* {swapData.priceImpact && +swapData.priceImpact >= 20 ? (
        <Box textAlign={'center'} mt={2} fontSize={'x-small'} color={'brand.500'}>
          <Text>This swap has a price impact of large than 20% !! </Text>
        </Box>
      ) : null} */}
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
            {swapData.tradeRoute?.tradeType === TradeType.EXACT_INPUT
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
        {swapData.action === BtnAction.disconnect ? (
          <Button width={'100%'} size="lg" colorScheme="gray" variant="solid">
            disconnected
          </Button>
        ) : null}
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
            {swapData.priceImpact && +swapData.priceImpact >= 20 ? 'The price impact is too high!' : 'swap'}
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
