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
import { execute, PoolsDocument, Pair as PairType } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
import { Pair } from '@/packages/swap-sdk';
import { use, useEffect, useState } from 'react';
import { Address, getAddress, parseUnits, formatUnits } from 'viem';
import { Link } from '@chakra-ui/next-js';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import getApy from '@/utils/getApy';

export default function PoolTvlPannel() {
  const chainId = useChainId();
  const account = useAccount();
  const toast = useToast();
  const publicClient = usePublicClient();
  const router = useRouter();
  const { data: pairTvls } = useQuery({
    queryKey: ['pairTvls', account.address],
    queryFn: async (): Promise<PairType[]> => {
      return execute(PoolsDocument, {}).then((res: { data: { pairs: PairType[] } }) => res.data.pairs);
    },
  });

  return (
    <Container maxW={'container.xl'} p={0}>
      <TableContainer>
        <Table size="md" variant="simple" colorScheme="gray" borderStyle={'solid'} borderWidth={'0.1px'}>
          <Thead>
            <Tr>
              <Th>Pool Composition</Th>
              <Th>TVL</Th>
              <Th>Volume(24h)</Th>
              <Th>APY</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pairTvls && pairTvls.length
              ? pairTvls.map((pair, index) => (
                  <Tr key={index} marginTop="20px">
                    <Td fontSize="16px" maxWidth={'2rem'}>
                      {pair.token0.symbol} / {pair.token1.symbol}
                    </Td>
                    <Td fontSize="16px">${(+pair.reserveUSD).toFixed(2)}</Td>
                    <Td>${(+pair.pairDayData[0].reserveUSD).toFixed(2)}</Td>
                    <Td>{getApy(pair.pairDayData[0].reserveUSD, pair.reserveUSD)}%</Td>
                    <Td>
                      <Button
                        variant="link"
                        size={'sm'}
                        colorScheme="teal"
                        leftIcon={<AddIcon fontSize={'smaller'} />}
                      >
                        <Link
                          href={`/pool/` + pair.id + '/add-liquidity'}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Add Liquidity
                        </Link>
                      </Button>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
