'use client';
import { Link } from '@chakra-ui/next-js';
import {
  Center,
  Container,
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Grid,
  GridItem,
  Button,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { AddIcon, ArrowBackIcon, MinusIcon } from '@chakra-ui/icons';
import { BiMoneyWithdraw } from 'react-icons/bi';

export default function PoolDetail() {
  const { pair: pairAddress } = useParams<{ pair: string }>();
  return (
    <Container maxW={'container.lg'} p={0}>
      <Box my={6}>
        <Link href={'/pool'}>
          <ArrowBackIcon mx="2px" /> All pools
        </Link>
      </Box>
      <Flex my={4}>
        <Box>
          <Heading as={'h3'} size={'md'}>
            ETH/UDST
          </Heading>
        </Box>
        <Spacer></Spacer>
        <HStack>
          <Link href={`/pool/` + pairAddress + '/add-liquidity'}>
            <Button size={'md'} rounded={4} leftIcon={<AddIcon fontSize={'smaller'} />}>
              add liquidity
            </Button>
          </Link>
          <Link href={`/pool/${pairAddress}/withdraw`}>
            <Button size={'md'} rounded={4} leftIcon={<BiMoneyWithdraw fontSize={'md'} />}>
              withdraw
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Grid h="400px" templateRows="repeat(4, 1fr)" templateColumns="repeat(6, 1fr)" gap={4}>
        <GridItem rowSpan={4} colSpan={4} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <StatGroup mt={4}>
            <Stat>
              <StatLabel>TVL</StatLabel>
              <StatNumber>345,670</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Volume</StatLabel>
              <StatNumber>45</StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup mt={6}>
            <Stat>
              <StatLabel>APY</StatLabel>
              <StatNumber>345,670</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Clicked</StatLabel>
              <StatNumber>45</StatNumber>
            </Stat>
          </StatGroup>
        </GridItem>
        <GridItem colSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <Stat>
            <StatLabel>My Pool Position</StatLabel>
            <StatNumber>345,670 OUT-V1</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <HStack>
            <Stat>
              <StatLabel>Reward Fees</StatLabel>
              <StatNumber>345,670</StatNumber>
            </Stat>
            <Button colorScheme="teal" rounded={4}>
              Claim
            </Button>
          </HStack>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} borderStyle={'solid'} borderWidth={'0.1px'} px={8} py={4}>
          <Stat>
            <StatLabel>Pool Liquidity </StatLabel>
            <StatNumber>345,670</StatNumber>
          </Stat>
        </GridItem>
      </Grid>
    </Container>
  );
}
