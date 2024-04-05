import { Container, Center, Button, Icon, Card, CardBody, Text, useToast } from '@chakra-ui/react';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { execute, PairTvlsDocument, PairTvl } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
import { Pair } from '@/packages/swap-sdk';
import { use, useEffect, useState } from 'react';
import { Address, getAddress, parseUnits, formatUnits } from 'viem';

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
    <Container>
      <Text> TVL: </Text>

      {pairTvls && pairTvls.length ? (
        pairTvls.map((pair, index) => (
          <Card key={index} marginTop="20px">
            <CardBody>
              <Text color="#666" fontSize="16px">
                {pair.symbol0 || pair.token0} / {pair.symbol1 || pair.token1}
              </Text>
              <Text color="#666" fontSize="16px">
                {formatUnits(pair.reserve0, 18)}/{formatUnits(pair.reserve1, 18)}
              </Text>
            </CardBody>
          </Card>
        ))
      ) : (
        <Text align="center" color="#999" fontSize="16px" marginTop="12px">
          loading tvl...
        </Text>
      )}
    </Container>
  );
}
