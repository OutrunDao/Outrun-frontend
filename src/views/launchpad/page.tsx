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
  Image,
  Flex,
  Tag,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord, FaInternetExplorer } from 'react-icons/fa';

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
          <Heading as={'h2'}>The most equitable and fair token launch platform</Heading>
          <br />
          <Heading as="h5" size={'sm'} mt="6">
            Enjoy high-quality projects around the world
          </Heading>
          <br />
          {/* <Button colorScheme="gray">
            <Link href={'/pool/create'}>Discover Project</Link>
          </Button> */}
        </VStack>
      </Box>
      <Container
        maxW={'container.lg'}
        borderStyle={'solid'}
        borderWidth={'0.5px'}
        borderRadius={'md'}
        borderColor="gray.600"
        boxShadow="xs"
        rounded="md"
        p={6}
        mt="18"
      >
        <Flex>
          <Center width={'200px'} p="10">
            <VStack spacing={'4'}>
              <Image alt="logo" width={100} height={100} src="https://ethena.fi/shared/ethena.svg"></Image>
            </VStack>
          </Center>
          <VStack alignItems={'flex-start'}>
            <Link href="/launchpad/1">
              <HStack spacing={'2'}>
                <Heading as={'h6'} fontSize={'18px'}>
                  Ethena
                </Heading>
                <Tag size={'sm'}>Staking</Tag>
                <Tag size={'sm'}>Layer2</Tag>
              </HStack>
            </Link>
            <Link href="/launchpad/1">
              <Text>
                Ethena is a synthetic dollar protocol built on Ethereum that provides a crypto-native solution
                for money not reliant on traditional banking system infrastructure, alongside a globally
                accessible dollar denominated instrument - the Internet Bond.
              </Text>
            </Link>

            <HStack spacing={'2'}>
              <Link href={'#'}>
                <Icon as={FaXTwitter} />
              </Link>
              <Link href="#">
                <Icon as={FaDiscord} />
              </Link>
              <Link href="#">
                <Icon as={FaInternetExplorer} />
              </Link>
            </HStack>
            <SimpleGrid columns={2} spacing={2} fontSize={'14px'}>
              <HStack spacing={'6'}>
                <Text>Token</Text>
                <Text color={'gray'}>ENA</Text>
              </HStack>
              <HStack spacing={'6'}>
                <Text>Amount</Text>
                <Text color={'gray'}>10000000</Text>
              </HStack>
              <HStack spacing={'6'}>
                <Text>Price</Text>
                <Text color={'gray'}>0.00000001</Text>
              </HStack>
              <HStack spacing={'6'}>
                <Text>Launch Date</Text>
                <Text color={'gray'}>2024-04-16 18:00</Text>
              </HStack>
            </SimpleGrid>
          </VStack>
        </Flex>
      </Container>
      <Center my="8">
        <Button colorScheme="pink" variant={'link'}>
          <Link href="https://forms.gle/RGPrhUYSdKbSdFnNA" target="blank">
            launch your project?
          </Link>
        </Button>
      </Center>
    </Box>
  );
};

export default Launchpad;
