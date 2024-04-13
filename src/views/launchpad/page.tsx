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
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Divider,
} from '@chakra-ui/react';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';

const Launchpad = () => {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const toast = useToast();
  const { data: walletClient } = useWalletClient();

  return (
    <Box>
      <Box mt="100">
        <VStack>
          <Heading as={'h2'}>The most equitable and fair token distribution platform</Heading>
          <br />
          <Heading as="h5" size={'sm'}>
            Discover new, high-quality projects around the world
          </Heading>
          <br />
          <Button colorScheme="gray">
            <Link href={'/pool/create'}>Discover Project</Link>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Launchpad;
