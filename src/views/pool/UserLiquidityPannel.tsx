import {
  Container,
  Button,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Link,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { useAccount, useChainId } from 'wagmi';
import { execute, LiquidityPositionsDocument, LiquidityPosition } from '@/subgraph';
import { useQuery } from '@tanstack/react-query';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function UserLiquiditesPannel() {
  const chainId = useChainId();
  const account = useAccount();
  const { data: userLiquidites } = useQuery({
    queryKey: ['userLiquidites', account.address],
    queryFn: async (): Promise<LiquidityPosition[]> => {
      return execute(LiquidityPositionsDocument, { user: account.address }).then(
        (res: { data: { liquidityPositions: LiquidityPosition[] } }) => res.data.liquidityPositions
      );
    },
  });

  return (
    <Container maxW={'container.xl'} p={0}>
      {userLiquidites && userLiquidites.length ? (
        <TableContainer>
          <Table size="md" variant="simple" colorScheme="gray" borderStyle={'solid'} borderWidth={'0.1px'}>
            <Thead>
              <Tr>
                <Th>Pool Composition</Th>
                <Th>Pool Balance</Th>
                <Th>My Shares</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userLiquidites.map((position, index) => (
                <Tr key={index} marginTop="20px">
                  <Td>
                    {position.pair.token0.symbol} / {position.pair.token1.symbol || 'unknown token'}
                  </Td>
                  <Td>
                    {position.pair.reserve0}/{position.pair.reserve1}
                  </Td>
                  <Td>
                    {position.pair.totalSupply == 0
                      ? 0
                      : ((+position.liquidityTokenBalance / position.pair.totalSupply) * 100).toFixed(2)}{' '}
                    %
                  </Td>
                  <Td>
                    <HStack>
                      <Button variant="link" size={'sm'} colorScheme="teal">
                        <Link href={`/pool/${position.pair.id}/add-liquidity`}>Add</Link>
                      </Button>
                      <Divider orientation="vertical" height={'10px'}></Divider>
                      <Button variant="link" size={'sm'} colorScheme="teal">
                        <Link href={`/pool/${position.pair.id}/withdraw`}>withdraw</Link>
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : null}
      {!userLiquidites || !userLiquidites.length ? (
        <Text align="center" color="#999" fontSize="16px" marginTop="12px">
          Your have no active liquidity positions.
        </Text>
      ) : null}
    </Container>
  );
}
