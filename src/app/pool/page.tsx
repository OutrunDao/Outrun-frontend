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
import { useState, useEffect, use } from 'react';
import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import { Address, formatUnits, getAddress, parseUnits } from 'viem';

import { Token } from '@/packages/swap-core';
import { Pair } from '@/packages/swap-sdk';
import { retry, set } from 'radash';
import { getRouterContract } from './getContract';
import UserLiquiditesPannel from './UserLiquidityPannel';

const defaultSymbol = 'WETH';

const PoolIndex = () => {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [token0, setToken0] = useState<Token>(getToken(defaultSymbol, chainId)!);
  const [token1, setToken1] = useState<Token>();
  const [token0Balance, setToken0Balance] = useState<string>('0');
  const [token1Balance, setToken1Balance] = useState<string>('0');
  const [token0AmountInput, setToken0AmountInput] = useState<string>('');
  const [token1AmountInput, setToken1AmountInput] = useState<string>('');
  const [tokenAllowance, setTokenAllowance] = useState<bigint[]>([0n, 0n]);
  const [pair, setPair] = useState<Pair>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const fetchBalance = async () => {
      const balance0 =
        !account.address || !token0
          ? '0'
          : (await token0.balanceOf(account.address, publicClient!)).toSignificantDigits(6, 1).toString();
      const balance1 =
        !account.address || !token1
          ? '0'
          : (await token1.balanceOf(account.address, publicClient!)).toSignificantDigits(6, 1).toString();
      setToken0Balance(balance0);
      setToken1Balance(balance1);
    };
    fetchBalance();
  }, [token0, token1, account.address]);
  useEffect(() => {
    const fetchPair = async () => {
      const pair = await retry({ times: 2, delay: 3000 }, () =>
        Fetcher.fetchPairData(token0, token1!, publicClient!)
      ).catch((e) => undefined);
      setPair(pair);
    };
    const fetchAllowance = async () => {
      if (!account.address || !token0 || !token1) return;
      const allowance0 = await token0.allowance(
        account.address,
        getAddress(V2_ROUTER_ADDRESSES[chainId]),
        publicClient!
      );
      const allowance1 = await token1.allowance(
        account.address,
        getAddress(V2_ROUTER_ADDRESSES[chainId]),
        publicClient!
      );
      setTokenAllowance([allowance0, allowance1]);
    };
    if (!token0 || !token1) {
      setPair(undefined);
      setTokenAllowance([0n, 0n]);
    } else {
      fetchPair();
      fetchAllowance();
    }
  }, [token0, token1]);

  async function _addLiquidity() {
    // console.log('add liquidity', tokenA, tokenB, pair);
    // addLiquidity();
    if (!token0 || !token1 || !account.address || !walletClient) return;
    setLoading(true);
    try {
      const tx = await getRouterContract(walletClient!).write.addLiquidity([
        token0.address,
        token1.address,
        parseUnits(token0AmountInput, token0.decimals),
        parseUnits(token1AmountInput, token1.decimals),
        parseUnits((+token0AmountInput * 0.05).toString(), token0.decimals),
        parseUnits((+token1AmountInput * 0.05).toString(), token1.decimals),
        account.address,
        Math.floor(Date.now() / 1000) + 60 * 10,
      ]);
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

  async function _Approve() {
    let tokenForApprove =
      formatUnits(tokenAllowance[0], token0.decimals) < token0AmountInput ? token0 : token1!;
    setLoading(true);
    try {
      const tx = await tokenForApprove.approve(
        getAddress(V2_ROUTER_ADDRESSES[chainId]),
        parseUnits(
          tokenForApprove.equals(token0) ? token0AmountInput : token1AmountInput,
          tokenForApprove.decimals
        ),
        walletClient!
      );
      await publicClient!.waitForTransactionReceipt({
        hash: tx as Address,
      });
      toast({
        title: 'Approve success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Approve failed',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  async function token0AmountInputHandler(value: string) {
    setToken0AmountInput(value);
    if (!pair || !token0) return;
    if (!value || isNaN(Number(value)) || value == '0') return;
    const price = pair.priceOf(token0);

    setToken1AmountInput((+price.toSignificant(6) * +value).toFixed(6));
  }
  async function token1AmountInputHandler(value: string) {
    setToken1AmountInput(value);
    if (!pair || !token1) return;
    if (!value || isNaN(Number(value)) || value == '0') return;

    const price = pair.priceOf(token1);
    setToken0AmountInput((+price.toSignificant(6) * +value).toFixed(6));
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
              value={token0AmountInput}
              onChange={(e) => token0AmountInputHandler(e.target.value)}
            />
            <TokenSelect defaultSymbol="WETH" chainId={chainId} onSelect={(token) => setToken0(token)} />
            <br />
          </InputGroup>
          <Container textAlign={'right'} pr={0}>
            <Text fontSize={'xs'}>Balance: {token0Balance}</Text>
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
              value={token1AmountInput}
              onChange={(e) => token1AmountInputHandler(e.target.value)}
            />
            <TokenSelect chainId={chainId} onSelect={(token) => setToken1(token)} />
          </InputGroup>
          <Container textAlign={'right'} pr={0}>
            <Text fontSize={'xs'}>Balance: {token1Balance}</Text>
          </Container>
          <Container textAlign={'right'} pr={0}>
            {pair ? (
              <Text fontSize={'xs'}>
                1{pair.token1.symbol} = {pair.token1Price.toFixed(6)} {pair.token0.symbol}
                <br />1{pair.token0.symbol} = {pair.token0Price.toFixed(6)} {pair.token1.symbol}
              </Text>
            ) : null}
          </Container>

          {token1 &&
          token0 &&
          (+formatUnits(tokenAllowance[0], token0.decimals) < +token0AmountInput ||
            +formatUnits(tokenAllowance[1], token1.decimals) < +token1AmountInput) ? (
            <Button width={'100%'} mt={4} size="lg" variant="custom" onClick={_Approve} isLoading={loading}>
              Set Approve{' '}
              {formatUnits(tokenAllowance[0], token0.decimals) < token0AmountInput
                ? token0.symbol
                : token1.symbol}
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
              add liquidity
            </Button>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default PoolIndex;
