'use client';

import { Box, Button, Center, Container, Flex, HStack, IconButton, Input, Link, Spacer, Text, useToast } from '@chakra-ui/react';
import TokenSelect from '@/components/TokenSelect';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import useLiquidity from '../useLiquidity';
import { useMemo } from 'react';
import { addressMap } from '@/contracts/addressMap';

export default function PoolCreate() {
  const { open } = useWeb3Modal();
  const publicClient = usePublicClient();
  const toast = useToast();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const { addLiquidity, loading: submitLoading } = useLiquidity();
  const { swapData, loading, setToken0, setToken1, setLoading, token0AmountInputHandler, token1AmountInputHandler, approveTokens, maxHandler } = useSwap({
    view: SwapView.createPoll,
    approve2Tokens: true,
  });

  async function createPool() {
    await approveTokens(addressMap[chainId].SWAP_ROUTER);
    addLiquidity(swapData);
  }

  const exchangeRate = useMemo(() => {
    if (swapData.pair) return '';
    try {
      const result = (+swapData.token1AmountInput / +swapData.token0AmountInput).toFixed(2);
      if (result === 'NaN') return '';
      return result;
    } catch (e) {
      return '';
    }
  }, [swapData.token0AmountInput, swapData.token1AmountInput]);

  return (
    <Container w={'420px'} borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md" p={6} mt="24">
      <Center mb={'2rem'}>
        <Text fontSize="md">Choose tokens</Text>
      </Center>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderBottomRadius={'0'}>
        <Flex>
          <Center>
            <TokenSelect token={swapData.token0} tokenDisable={swapData.token1} onSelect={(token) => setToken0(token)} />
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
            <TokenSelect tokenDisable={swapData.token0} token={swapData.token1} onSelect={(token) => setToken1(token)} />
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
              <Button colorScheme="teal" variant="link" size={'xs'} ml={'6px'} textDecoration={'underline'} onClick={() => maxHandler(1)}>
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
          {(swapData.pair || exchangeRate) && swapData.token0 && swapData.token1 ? (
            <>
              1{swapData.token0.symbol} = {swapData.pair ? swapData.pair.token0Price.toFixed(6) : exchangeRate} {swapData.token1.symbol}
            </>
          ) : null}
        </Text>
      </HStack>
      <br />
      {swapData.pair ? (
        <Box textAlign={'center'} fontSize={'x-small'} color={'brand.500'}>
          <Text>This pool already exists, you can add liquidity </Text>
          <Link href={`/pool/${swapData.pair.liquidityToken.address}/add-liquidity`} textDecoration={'underline'}>
            Here
          </Link>
        </Box>
      ) : null}
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
          <Button width={'100%'} size="lg" margin={0} colorScheme="gray" variant="solid" isDisabled={!!swapData.pair} onClick={createPool} isLoading={loading || submitLoading}>
            create pool
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.disable ? (
          <Button width={'100%'} size="lg" colorScheme="gray" isDisabled variant="solid" rounded={'md'}>
            create pool
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.invalidPair ? (
          <Button width={'100%'} size="lg" colorScheme="gray" isDisabled variant="solid" rounded={'md'}>
            invalid pair
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
