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
  Link,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import TokenSelect, { getToken } from '@/components/TokenSelect';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import useLiquidity from '../useLiquidity';
const defaultSymbol = 'ETH';

export default function PoolCreate() {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const { addLiquidity } = useLiquidity();
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
  } = useSwap(SwapView.createPoll);

  async function createPool() {
    addLiquidity(swapData);
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
        <Text fontSize="md">Choose tokens</Text>
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
              tokenDisable={swapData.token1}
              chainId={chainId}
              onSelect={(token) => setToken0(token)}
            />
          </Center>
          <Center width={'100%'}>
            <Input
              variant="main"
              size="lg"
              textAlign={'right'}
              isDisabled={!!swapData.pair}
              placeholder="token amount"
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
              chainId={chainId}
              tokenDisable={swapData.token0}
              token={swapData.token1}
              onSelect={(token) => setToken1(token)}
            />
          </Center>
          <Center width={'100%'}>
            <Input
              variant="main"
              size="lg"
              textAlign={'right'}
              isDisabled={!!swapData.pair}
              placeholder="token amount"
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
      {/* <br />
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
      </HStack> */}
      <br />
      {swapData.pair ? (
        <Box textAlign={'center'} fontSize={'x-small'} color={'brand.500'}>
          <Text>This pool already exists, you can add liquidity </Text>
          <Link
            href={`/pool/${swapData.pair.liquidityToken.address}/add-liquidity`}
            textDecoration={'underline'}
          >
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
            isDisabled={!!swapData.pair}
            onClick={createPool}
            isLoading={loading}
          >
            create pool
          </Button>
        ) : null}
        {swapData.action === BtnAction.disable ? (
          <Button width={'100%'} size="lg" colorScheme="gray" isDisabled variant="solid" rounded={'md'}>
            create pool
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
