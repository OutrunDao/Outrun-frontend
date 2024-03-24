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
} from '@chakra-ui/react';
import { PiSwimmingPoolDuotone } from 'react-icons/pi';
import TokenSelect from '@/components/TokenSelect';
import { ArrowDownIcon } from '@chakra-ui/icons';
// import { useGetPair } from '@/hook/contracts/useSwapFactory';
import { useState, useEffect } from 'react';
import { tokenList } from '@/tokens/list';
import { TokenInfo } from '@uniswap/token-lists';
import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { toToken } from '../swap/fns';
import { useAccount, useChainId } from 'wagmi';
import useToken from '@/hook/useToken';
import { useLiquidity } from './useContract';
import { V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import { formatUnits, getAddress } from 'viem';
import { execute, UserLiquiditiesDocument, LiquidityHolding } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
const PoolIndex = () => {
  const [pairs, setPairs] = useState<Array<TokenInfo | undefined>>([tokenList.tokens[0]]);
  const [pairsInput, setPairsInput] = useState<Array<string>>(['', '']);
  const [pair, setPair] = useState<any>();
  const account = useAccount();
  const { data: userLiquidites } = useQuery({
    queryKey: ['userLiquidites', account.address],
    queryFn: async (): Promise<LiquidityHolding[]> => {
      return execute(UserLiquiditiesDocument, { user: account.address }).then(
        (res: { data: { liquidityHoldings: LiquidityHolding[] } }) => res.data.liquidityHoldings
      );
    },
  });
  const {
    balance: balanceOfToken0,
    allowance: allowanceA,
    fetchBalance: fetchBalanceA,
    fetchAllowance: fetchAllowanceA,
    approve: approveA,
  } = useToken(pairs[0]);
  const {
    balance: balanceOfToken1,
    allowance: allowanceB,
    fetchBalance: fetchBalanceB,
    fetchAllowance: fetchAllowanceB,
    approve: approveB,
  } = useToken(pairs[1]);
  const { addLiquidity } = useLiquidity(pairs[0], pairs[1], pairsInput[0], pairsInput[1], account.address);
  const chainId = useChainId();
  const onSelctToken = (token: TokenInfo, index: number) => {
    let nextIndex = (index + 1) % 2;
    pairs[index] = token;
    if (pairs[index] && pairs[index]!.address === (pairs[nextIndex] && pairs[nextIndex]!.address))
      pairs[(index + 1) % 2] = undefined;
    setPairs([...pairs]);
  };

  const onPairsInput = (value: string, index: number) => {
    setPairsInput((pairsInput) => {
      pairsInput[index] = value;
      return [...pairsInput];
    });
  };

  useEffect(() => {
    // console.log('pairs', pairs);
    if (pairs[0] && pairs[1]) {
      Fetcher.fetchPairData(toToken(pairs[0]), toToken(pairs[1])).then((pair) => {
        console.log('pair', pair.token0Price.toFixed(6));
        setPair(pair);
        // pair.token0Price
      });
      fetchBalanceA(account.address!);
      fetchBalanceB(account.address!);
      fetchAllowanceA(account.address!, getAddress(V2_ROUTER_ADDRESSES[chainId]));
      fetchAllowanceB(account.address!, getAddress(V2_ROUTER_ADDRESSES[chainId]));
    }
  }, [pairs]);

  function _addLiquidity() {
    // console.log('add liquidity', tokenA, tokenB, pair);
    addLiquidity();
  }

  function _Approve() {
    if (formatUnits(allowanceA, 18) < pairsInput[0]) {
      return approveA(getAddress(V2_ROUTER_ADDRESSES[chainId]), pairsInput[0]);
    }
    if (formatUnits(allowanceB, 18) < pairsInput[1]) {
      return approveB(getAddress(V2_ROUTER_ADDRESSES[chainId]), pairsInput[1]);
    }
  }
  console.log(userLiquidites);

  return (
    <>
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
              value={pairsInput[0]}
              onChange={(e) => onPairsInput(e.target.value, 0)}
            />
            <TokenSelect selectedToken={pairs[0]} onSelect={(token) => onSelctToken(token, 0)} />
            <br />
          </InputGroup>
          <Container textAlign={'right'} pr={0}>
            <Text fontSize={'xs'}>
              Balance: {balanceOfToken0} {allowanceA.toString()}
            </Text>
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
              value={pairsInput[1]}
              onChange={(e) => onPairsInput(e.target.value, 1)}
            />
            <TokenSelect selectedToken={pairs[1]} onSelect={(token) => onSelctToken(token, 1)} />
          </InputGroup>
          <Container textAlign={'right'} pr={0}>
            <Text fontSize={'xs'}>
              Balance: {balanceOfToken1} {allowanceB.toString()}
            </Text>
          </Container>
          <Container textAlign={'right'} pr={0}>
            {pair ? (
              <Text fontSize={'xs'}>
                1{pairs[0]?.symbol} = {pair.token0Price.toFixed(6)} {pairs[1]?.symbol}
              </Text>
            ) : null}
          </Container>

          {formatUnits(allowanceA, 18) >= pairsInput[0] && formatUnits(allowanceB, 18) >= pairsInput[1] ? (
            <Button width={'100%'} mt={4} size="lg" variant="custom" onClick={_addLiquidity}>
              add liquidity
            </Button>
          ) : (
            <Button width={'100%'} mt={4} size="lg" variant="custom" onClick={_Approve}>
              Set Approve
            </Button>
          )}
        </VStack>
      </Container>
      <Container>
        <Center marginTop="60px">
          <Icon color="#666" boxSize={16} as={PiSwimmingPoolDuotone}></Icon>
        </Center>
        <Text align="center" color="#999" fontSize="16px" marginTop="12px">
          Your have no active liquidity positions.
        </Text>
      </Container>
    </>
  );
};

export default PoolIndex;
