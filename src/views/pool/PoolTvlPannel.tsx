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
import { execute, PairTvlsDocument, PairTvl } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
import { Pair } from '@/packages/swap-sdk';
import { use, useEffect, useState } from 'react';
import { Address, getAddress, parseUnits, formatUnits } from 'viem';
import { Link } from '@chakra-ui/next-js';
import { AddIcon } from '@chakra-ui/icons';

export default function PoolTvlPannel() {
  const chainId = useChainId();
  const account = useAccount();
  const toast = useToast();
  const publicClient = usePublicClient();
  const { data: pairTvls } = useQuery({
    queryKey: ['pairTvls', account.address],
    queryFn: async (): Promise<PairTvl[]> => {
      return execute(PairTvlsDocument, {}).then(
        (res: { data: { pairTvls: PairTvl[] } }) => res.data.pairTvls
      );
    },
  });

  return (
    <Container maxW={'container.xl'} p={0}>
      <TableContainer>
        <Table size="md" variant="simple" colorScheme="gray" borderStyle={'solid'} borderWidth={'0.1px'}>
          <Thead>
            <Tr>
              <Th>Pool Composition</Th>
              <Th>Token Volume</Th>
              <Th>Tvl</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pairTvls && pairTvls.length
              ? pairTvls.map((pair, index) => (
                  <Tr key={index} marginTop="20px">
                    <Td fontSize="16px" maxWidth={'2rem'}>
                      {pair.symbol0 || pair.token0} / {pair.symbol1 || 'unknown token'}
                    </Td>
                    <Td fontSize="16px">
                      {formatUnits(pair.reserve0, 18)}/{formatUnits(pair.reserve1, 18)}
                    </Td>
                    <Td>--$</Td>
                    <Td>
                      <Button
                        variant="link"
                        size={'sm'}
                        colorScheme="teal"
                        leftIcon={<AddIcon fontSize={'smaller'} />}
                      >
                        <Link href={`/pool/` + pair.pair + '/add-liquidity'}>Add Liquidity</Link>
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
