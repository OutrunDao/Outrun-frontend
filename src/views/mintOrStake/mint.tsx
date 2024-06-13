'use client';

import { Box, Button, Center, Container, Flex, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, Link, Radio, RadioGroup, Spacer, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import TokenSelect from '@/components/TokenSelect';
import { RepeatIcon } from '@chakra-ui/icons';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseEther, parseEventLogs, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import { Currency, Ether, Percent, Token, TradeType } from '@/packages/swap-core';
import { Router as SwapRouter } from '@/packages/swap-sdk';
import { get, retry } from 'radash';
import { useEffect, useMemo, useState } from 'react';
import useContract from '@/hook/useContract';
import { addressMap, ContractName } from '@/contracts/addressMap';
import { BlockExplorers } from '@/contracts/chains';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import getORETH from '@/contracts/get/oreth';
import { USDB } from '@/contracts/usdb';
import getORUSD from '@/contracts/get/orusd';
import { currencyMintPageSelectList } from '@/contracts/currencys';
import { RETH } from '@/contracts/reth';
import { RUSD } from '@/contracts/rusd';
export default function Mint() {
  const chainId = useChainId();
  const account = useAccount();
  const toast = useToast();
  const { open } = useWeb3Modal();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const { write: writeContract, loading: routerContractLoading } = useContract();
  const { swapData, loading, setToken0, setToken1, setLoading, approveTokens, token0AmountInputHandler, updateTokenBalance, token1AmountInputHandler, setSlippage, maxHandler } = useSwap({
    view: SwapView.mint,
  });
  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);
  const title = useMemo(() => {
    if (!swapData.token0) return 'Choose Token';
    if (swapData.token0.equals(Ether.onChain(chainId))) {
      return 'Mint orETH';
    } else if (swapData.token0.equals(RETH[chainId])) {
      return 'Redeem ETH';
    } else if (swapData.token0.equals(USDB[chainId])) {
      return 'Mint orUSD';
    } else {
      return 'Redeem USDB';
    }
  }, [swapData.token0, chainId]);
  useEffect(() => {
    setToken0(Ether.onChain(chainId));
    setToken1(RETH[chainId]);
  }, [chainId]);
  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
  };

  function onSelectToken0(token: Currency) {
    setToken0(token);
    if (token.equals(Ether.onChain(chainId))) {
      setToken1(RETH[chainId]);
    } else if (token.equals(RETH[chainId])) {
      setToken1(Ether.onChain(chainId));
    } else if (token.equals(USDB[chainId])) {
      setToken1(RUSD[chainId]);
    } else {
      setToken1(USDB[chainId]);
    }
  }

  async function swap() {
    if (!swapData.token0 || !swapData.token1 || !account.address) return;
    setLoading(true);
    if (swapData.isTransformView) {
      let data;
      if (swapData.token0.isNative) {
        // eth -> oreth
        data = await writeContract(
          // @ts-ignore
          getORETH(chainId, publicClient!, walletClient),
          {
            actionTitle: title,
          },
          'deposit',
          [],
          {
            account,
            value: parseEther(swapData.token0AmountInput),
          }
        );
      } else if (swapData.token1.isNative) {
        await approveTokens(addressMap[chainId].ORETH);
        // oreth=>eth
        data = await writeContract(
          // @ts-ignore
          getORETH(chainId, publicClient!, walletClient),
          {
            actionTitle: title,
          },
          'withdraw',
          [parseEther(swapData.token0AmountInput)],
          {
            account,
          }
        );
      } else if (swapData.token0.equals(USDB[chainId])) {
        // usdb -> orusd
        await approveTokens(addressMap[chainId].ORUSD);
        data = await writeContract(
          // @ts-ignore
          getORUSD(chainId, publicClient, walletClient),
          {
            actionTitle: title,
          },
          'deposit',
          [parseUnits(swapData.token0AmountInput, 18)],
          {
            account,
          }
        );
      } else {
        // orusd -> usdb
        await approveTokens(addressMap[chainId].ORUSD);
        data = await writeContract(
          // @ts-ignore
          getORUSD(chainId, publicClient, walletClient),
          {
            actionTitle: title,
          },
          'withdraw',
          [parseUnits(swapData.token0AmountInput, 18)],
          {
            account,
          }
        );
      }
      if (data && data.status === 'success')
        toast({
          title: title + ' finished',
          status: 'success',
          position: 'bottom',
          description: (
            <>
              {`You have successfully swapped ${swapData.token0AmountInput} ${swapData.token0.symbol} for ${swapData.token0AmountInput} ${swapData.token1.symbol}`}. view on{' '}
              <Link isExternal href={blockExplore + '/tx/' + data.transactionHash} textDecoration={'underline'} colorScheme="teal">
                BlastScan
              </Link>
            </>
          ),
          duration: null,
          isClosable: true,
        });

      await updateTokenBalance();
    }

    setLoading(false);
  }

  return (
    <Container borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md" p={6}>
      <Flex mb={'4px'}>
        <Center>
          <Text fontSize="sm" mb={2}>
            Mint Or Redeem Token
          </Text>
        </Center>
        <Spacer></Spacer>
      </Flex>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderBottomRadius={'0'}>
        <Flex>
          <Center>
            <TokenSelect hiddenSearchInput tokenList={currencyMintPageSelectList} token={swapData.token0} tokenDisable={swapData.token1} onSelect={onSelectToken0} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="lg" textAlign={'right'} placeholder="Intput token amount" value={swapData.token0AmountInput} onChange={(e) => token0AmountInputHandler(e.target.value)} />
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
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
        <Flex>
          <Center>
            <TokenSelect hiddenSearchInput isDisabled tokenList={currencyMintPageSelectList} tokenDisable={swapData.token0} token={swapData.token1} onSelect={() => {}} />
          </Center>
          <Center width={'100%'}>
            <Input variant="main" size="lg" textAlign={'right'} placeholder="Output token amount" value={swapData.token1AmountInput} onChange={(e) => token1AmountInputHandler(e.target.value)} />
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
      {swapData.token0 && swapData.token1 ? (
        <HStack fontSize={'small'} px="8px" py={1} color={'green'}>
          <Text w="40%">Exchange Rate</Text>
          <Text w="70%" textAlign={'right'}>
            1{swapData.token0!.symbol} = 1 {swapData.token1!.symbol}
          </Text>
        </HStack>
      ) : null}

      {/* {swapData.priceImpact && +swapData.priceImpact >= 20 ? (
        <Box textAlign={'center'} mt={2} fontSize={'x-small'} color={'brand.500'}>
          <Text>This swap has a price impact of large than 20% !! </Text>
        </Box>
      ) : null} */}
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
          <Button width={'100%'} size="lg" margin={0} colorScheme="gray" variant="solid" onClick={swap} isLoading={loading}>
            {title}
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.disable ? (
          <Button width={'100%'} size="lg" margin={0} colorScheme="gray" variant="solid" isDisabled>
            {title}
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
