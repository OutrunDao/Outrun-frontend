'use client';

import { Box, Button, Center, Container, Flex, HStack, IconButton, Input, Spacer, Text, useToast } from '@chakra-ui/react';
import TokenSelect, { getToken } from '@/components/TokenSelect';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import useLiquidity from '../useLiquidity';
import { execute, PairDocument, Pair as PairType } from '@/subgraph';
import { useEffect } from 'react';
import { Token } from '@/packages/swap-core';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { addressMap } from '@/contracts/addressMap';

const defaultSymbol = 'ETH';

export default function AddLiquidityPage() {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const { open } = useWeb3Modal();

  const toast = useToast();
  const { pair: pairAddress } = useParams<{ pair: string }>();
  // const { param } = router.query;
  const { data: pairTarget } = useQuery({
    queryKey: ['pairfind', pairAddress],
    queryFn: async (): Promise<PairType> => {
      return execute(PairDocument, { addr: pairAddress }).then((res: { data: { pairs: PairType[] } }) => res.data.pairs[0]);
    },
  });

  const { swapData, loading, setToken0, setToken1, setLoading, token0AmountInputHandler, token1AmountInputHandler, approveTokens, maxHandler } = useSwap(SwapView.addLiquidity);
  const { addLiquidity, loading: submitLoading } = useLiquidity();

  async function _addLiquidity() {
    await approveTokens(addressMap[chainId].SWAP_ROUTER);
    addLiquidity(swapData);
  }

  useEffect(() => {
    if (!pairAddress || !pairTarget || !publicClient) return;
    const token0 = new Token(chainId, pairTarget.token0.id, +pairTarget.token0.decimals, pairTarget.token0.symbol, pairTarget.token0.name);
    setToken0(token0);
    const token1 = new Token(chainId, pairTarget.token1.id, +pairTarget.token1.decimals, pairTarget.token1.symbol, pairTarget.token1.name);
    setToken1(token1);
    // setToken1(new Token(chainId, pairTarget.token1, 18));
  }, [pairTarget, chainId]);

  return (
    <Container w={'420px'} borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md" p={6} mt="24">
      <Center mb={'2rem'}>
        <Text fontSize="md">Add Liquidity</Text>
      </Center>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderBottomRadius={'0'}>
        <Flex>
          <Center>
            <TokenSelect defaultSymbol={defaultSymbol} token={swapData.token0} tokenDisable={swapData.token1} chainId={chainId} onSelect={(token) => setToken0(token)} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="lg" textAlign={'right'} placeholder="Input token amount" value={swapData.token0AmountInput} onChange={(e) => token0AmountInputHandler(e.target.value)} />
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
            <TokenSelect chainId={chainId} tokenDisable={swapData.token0} token={swapData.token1} onSelect={(token) => setToken1(token)} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="lg" textAlign={'right'} placeholder="token amount" value={swapData.token1AmountInput} onChange={(e) => token1AmountInputHandler(e.target.value)} />
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
          {swapData.pair ? (
            <>
              1{swapData.token0.symbol} = {swapData.pair.token0Price.toFixed(6)} {swapData.token1!.symbol}
            </>
          ) : null}
        </Text>
      </HStack>
      <Box mt={'1rem'} fontSize={16}>
        {swapData.submitButtonStatus === BtnAction.insufficient ? (
          <Button width={'100%'} mt={4} size="lg" variant="solid" colorScheme="gray">
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
          <Button width={'100%'} mt={4} size="lg" colorScheme="gray" variant="solid" onClick={_addLiquidity} isLoading={loading || submitLoading}>
            add liquidity
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.disable ? (
          <Button width={'100%'} mt={4} disabled size="lg" isDisabled colorScheme="gray" variant="solid">
            add liquidity
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
