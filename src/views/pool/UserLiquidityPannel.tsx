import {
  Container,
  Center,
  Button,
  Icon,
  Card,
  CardBody,
  Text,
  useToast,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tfoot,
  Tbody,
} from '@chakra-ui/react';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { execute, LiquidityPositionsDocument, LiquidityPosition } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
import { Pair } from '@/packages/swap-sdk';
import { use, useEffect, useState } from 'react';
import { Fetcher } from '@/packages/swap-sdk/fetcher';
import { map, sleep } from 'radash';
import { Address, ContractFunctionExecutionError, getAddress, parseUnits } from 'viem';
import { CurrencyAmount, Token, V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import Decimal from 'decimal.js-light';
import { getRouterContract } from './getContract';
import { waitForTransactionReceipt } from 'viem/actions';
import tokenSwitch, { CurrencyPairType } from './tokenSwitch';
import { ArrowForwardIcon, ArrowRightIcon, ArrowUpIcon } from '@chakra-ui/icons';
function LiquidityRatio({ liquidityToken, userAddress }: { liquidityToken: Token; userAddress: Address }) {
  const publicClient = usePublicClient();
  const [totalSupply, setTotalSupply] = useState<Decimal>(new Decimal(0));
  const [balance, setBalance] = useState<Decimal>(new Decimal(0));
  useEffect(() => {
    if (!userAddress || !liquidityToken) return;
    const fetchTotalSupply = async () => {
      const totalSupply = await liquidityToken.totalSupply(publicClient!);
      const balance = await liquidityToken.balanceOf(userAddress, publicClient!);
      // console.log(totalSupply.toString(), balance.toString());
      setTotalSupply(totalSupply);
      setBalance(balance);
    };
    fetchTotalSupply();
  }, [liquidityToken]);
  return (
    <>
      <span>{balance.dividedBy(totalSupply).mul(100).toFixed(0)}%</span>
    </>
  );
}

export default function UserLiquiditesPannel() {
  const chainId = useChainId();
  const account = useAccount();
  const { data: walletClient } = useWalletClient();
  const toast = useToast();
  const publicClient = usePublicClient();
  const [pairs, setPairs] = useState<Array<Pair>>([]);
  const { data: userLiquidites } = useQuery({
    queryKey: ['userLiquidites', account.address],
    queryFn: async (): Promise<LiquidityPosition[]> => {
      return execute(LiquidityPositionsDocument, { user: account.address }).then(
        (res: { data: { liquidityPositions: LiquidityPosition[] } }) => res.data.liquidityPositions
      );
    },
  });
  useEffect(() => {
    if (!userLiquidites || !userLiquidites.length) return;
    const fetchPairs = async () => {
      return await map(userLiquidites, async (liquidity) => {
        return new Pair(
          CurrencyAmount.fromRawAmount(
            new Token(
              chainId,
              liquidity.pair.token0.id,
              +liquidity.pair.token0.decimals,
              liquidity.pair.token0.symbol,
              liquidity.pair.token0.name
            ),
            parseUnits(liquidity.pair.reserve0, +liquidity.pair.token0.decimals).toString()
          ),
          CurrencyAmount.fromRawAmount(
            new Token(
              chainId,
              liquidity.pair.token1.id,
              +liquidity.pair.token1.decimals,
              liquidity.pair.token1.symbol,
              liquidity.pair.token1.name
            ),
            parseUnits(liquidity.pair.reserve1, +liquidity.pair.token1.decimals).toString()
          )
        );
      });
    };
    fetchPairs()
      .then((pairs) => {
        setPairs(pairs);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userLiquidites]);

  async function removeLiquidity(pair: Pair) {
    toast({
      status: 'loading',
      title: 'removeLiquidity',
      isClosable: true,
    });
    const router = getRouterContract(walletClient!);
    const liquidityTokenBalance = await pair.liquidityToken.balanceOf(account.address!, publicClient!);
    const deadline = Math.floor(new Date().getTime() / 1000) + 10 * 60;
    await pair.liquidityToken.approve(
      getAddress(V2_ROUTER_ADDRESSES[chainId]),
      parseUnits(liquidityTokenBalance.toString(), 18),
      walletClient!
    );
    const [type, tokenA, tokenB] = tokenSwitch(pair.token0, pair.token1);
    let execute = 'removeLiquidity';
    let liquidity = parseUnits(liquidityTokenBalance.toString(), 18);
    let to = account.address;
    let args = [pair.token0.address, pair.token1.address, liquidity, 0, 0, to, deadline];
    if (type === CurrencyPairType.EthAndToken) {
      execute = 'removeLiquidityETH';
      args = [(tokenB as Token).address, liquidity, 0, 0, to, deadline];
    } else if (type === CurrencyPairType.EthAndUsdb) {
      execute = 'removeLiquidityETHAndUSDB';
      args = [liquidity, 0, 0, to, deadline];
    } else if (type === CurrencyPairType.UsdbAndToken) {
      execute = 'removeLiquidityUSDB';
      args = [(tokenB as Token).address, liquidity, 0, 0, to, deadline];
    }

    const tx = await router.write[execute](args);
    toast({
      status: 'success',
      title: 'add transaction success',
    });
    const data = await waitForTransactionReceipt(publicClient!, {
      hash: tx,
    });
    console.log(data);
  }

  return (
    <Container maxW={'container.xl'} p={0}>
      {pairs && pairs.length ? (
        <TableContainer>
          <Table size="md" variant="simple" colorScheme="gray" borderStyle={'solid'} borderWidth={'0.1px'}>
            <Thead>
              <Tr>
                <Th>Pool Composition</Th>
                <Th>Token Volume</Th>
                <Th>My Shares</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pairs && pairs.length
                ? pairs.map((pair, index) => (
                    <Tr key={index} marginTop="20px">
                      <Td>
                        {pair.token0.symbol} / {pair.token1.symbol || 'unknown token'}
                      </Td>
                      <Td>
                        {pair.reserveOf(pair.token0).toExact()}/{pair.reserveOf(pair.token1).toExact()}
                      </Td>
                      <Td>
                        <LiquidityRatio liquidityToken={pair.liquidityToken} userAddress={account.address!} />
                      </Td>
                      <Td>
                        <Button
                          variant="link"
                          size={'sm'}
                          colorScheme="teal"
                          rightIcon={<ArrowForwardIcon fontSize={'smaller'} />}
                          onClick={() => removeLiquidity(pair)}
                        >
                          withdraw
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      ) : null}
      {!pairs || !pairs.length ? (
        <Text align="center" color="#999" fontSize="16px" marginTop="12px">
          Your have no active liquidity positions.
        </Text>
      ) : null}
    </Container>
  );
}
