'use client';

import { Box, Button, Center, Container, Flex, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, Link, Radio, RadioGroup, Spacer, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import TokenSelect from '@/components/TokenSelect';
import { RepeatIcon } from '@chakra-ui/icons';
import { TradeOptionsPopover } from './TradeOptionsPopover';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { Address, formatUnits, getAddress, parseEther, parseEventLogs, parseUnits } from 'viem';
import { useSwap, BtnAction, SwapView } from '@/hook/useSwap';
import { Percent, Token, TradeType } from '@/packages/swap-core';
import { Router as SwapRouter } from '@/packages/swap-sdk';
import { get, retry } from 'radash';
import { useMemo, useState } from 'react';
import useContract from '@/hook/useContract';
import { addressMap, ContractName } from '@/contracts/addressMap';
import { BlockExplorers } from '@/contracts/chains';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import getORETH from '@/contracts/get/oreth';
import { USDB } from '@/contracts/usdb';
import getORUSD from '@/contracts/get/orusd';

export default function Swap() {
  const chainId = useChainId();
  const account = useAccount();
  const toast = useToast();
  const { open } = useWeb3Modal();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const { write: writeContract, loading: routerContractLoading } = useContract();
  const { swapData, loading, setToken0, setToken1, setLoading, approveTokens, token0AmountInputHandler, updateTokenBalance, token1AmountInputHandler, setSlippage, maxHandler } = useSwap({
    view: SwapView.swap,
    getTradeRoute: true,
  });
  const [slippageTolerance, setSlippageTolerance] = useState(2);
  const [deadlineInput, setDeadlineInput] = useState(10);
  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);
  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
    token0AmountInputHandler('');
    token1AmountInputHandler('');
  };

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
            actionTitle: 'Swap',
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
            actionTitle: 'Swap',
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
            actionTitle: 'Swap',
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
            actionTitle: 'Swap',
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
          title: 'Swap finished',
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
    } else {
      await approveTokens(addressMap[chainId].SWAP_ROUTER);
      const { methodName, args, value } = SwapRouter.swapCallParameters(swapData.token0, swapData.token1, swapData.tradeRoute!, {
        allowedSlippage: new Percent(slippageTolerance, 100),
        deadline: Math.floor(new Date().getTime() / 1000) + deadlineInput * 60,
        recipient: account.address,
      });
      const data = await writeContract(
        ContractName.SWAP_ROUTER,
        {
          actionTitle: 'Swap',
        },
        methodName,
        args,
        { value, account }
      );
      if (data && data.status === 'success') {
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
        const receive = get(logs[logs.length - 1], 'args.value') as bigint;
        if (spent && receive) {
          toast({
            title: 'Swap finished',
            status: 'success',
            position: 'bottom',
            description: (
              <>
                {' '}
                {`You have successfully swapped ${formatUnits(spent, swapData.token0.decimals)} ${swapData.token0.symbol} for ${formatUnits(receive, swapData.token1.decimals)} ${swapData.token1.symbol}`}. view
                on{' '}
                <Link isExternal href={blockExplore + '/tx/' + data.transactionHash} textDecoration={'underline'} colorScheme="teal">
                  BlastScan
                </Link>
              </>
            ),
            duration: null,
            isClosable: true,
          });
        }
        await updateTokenBalance();
      }
    }

    setLoading(false);
  }

  function onTradeOptionsHandler(slip: string, deadline: string) {
    setDeadlineInput(+deadline);
    setSlippageTolerance(+slip);
    setSlippage(+slip);
  }

  return (
    <Container w={'420px'} borderStyle={'solid'} borderWidth={'0.5px'} borderRadius={'md'} borderColor="gray.600" boxShadow="xs" rounded="md" p={6} mt="24">
      <Flex mb={'4px'}>
        <Center>
          <Text fontSize="md">Swap</Text>
        </Center>
        <Spacer></Spacer>
        <TradeOptionsPopover onSelect={onTradeOptionsHandler}></TradeOptionsPopover>
      </Flex>
      <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderBottomRadius={'0'}>
        <Flex>
          <Center>
            <TokenSelect token={swapData.token0} tokenDisable={swapData.token1} onSelect={(token) => setToken0(token)} />
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
            <TokenSelect tokenDisable={swapData.token0} token={swapData.token1} onSelect={(token) => setToken1(token)} />
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
      <HStack fontSize={'small'} px="8px" hidden={!swapData.exchangeRate && !swapData.isTransformView}>
        <Text w="40%">Exchange rate</Text>
        <Text w="70%" textAlign={'right'}>
          {swapData.exchangeRate ? (
            <>
              1{swapData.token0!.symbol} = {swapData.exchangeRate} {swapData.token1!.symbol}
            </>
          ) : null}
          {swapData.isTransformView ? (
            <>
              1{swapData.token0!.symbol} = 1 {swapData.token1!.symbol}
            </>
          ) : null}
        </Text>
      </HStack>
      {swapData.tradeRoutePath ? (
        <HStack fontSize={'small'} px="8px" py={2}>
          <Text w="40%">Exchange Route</Text>
          <Text w="70%" textAlign={'right'}>
            {swapData.tradeRoutePath}
          </Text>
        </HStack>
      ) : null}
      {swapData.minimalReceive ? (
        <HStack fontSize={'small'} px="8px" py={1} color={'green'}>
          <Text w="40%">Minimal Receive</Text>
          <Text w="70%" textAlign={'right'}>
            {swapData.minimalReceive}
          </Text>
        </HStack>
      ) : null}
      {swapData.priceImpact ? (
        <HStack fontSize={'small'} px="8px" py={1} color={swapData.priceImpact && +swapData.priceImpact >= 20 ? 'brand.500' : 'green'}>
          <Text w="40%">PriceImpact</Text>
          <Text w="70%" textAlign={'right'}>
            {swapData.priceImpact ? swapData.priceImpact + '%' : '---'}
          </Text>
        </HStack>
      ) : null}

      {swapData.routeNotExist ? (
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
            swap
          </Button>
        ) : null}
        {swapData.submitButtonStatus === BtnAction.disable ? (
          <Button width={'100%'} isDisabled size="lg" colorScheme="gray" variant="solid" rounded={'md'}>
            {swapData.priceImpact && +swapData.priceImpact >= 20 ? 'The price impact is too high!' : 'swap'}
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
