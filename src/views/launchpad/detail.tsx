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
  HStack,
  Tag,
  Flex,
  SimpleGrid,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepIcon,
  StepNumber,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
} from '@chakra-ui/react';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord, FaInternetExplorer } from 'react-icons/fa';
import { useState } from 'react';
const LaunchpadDetail = () => {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const toast = useToast();
  const { data: walletClient } = useWalletClient();
  const [depositeAmount, setDepositeAmount] = useState('');
  const steps = [
    { title: 'Deposite', description: '' },
    { title: 'Claim', description: 'Date & Time' },
    { title: 'Trade', description: 'Select Rooms' },
  ];
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  function depositeHandler(value: string) {
    setDepositeAmount(value);
  }
  return (
    <Box>
      <Center mt="60px">
        <VStack spacing={4}>
          <Image alt="logo" width={100} height={100} src="https://ethena.fi/shared/ethena.svg"></Image>
          <Heading as={'h6'} fontSize={'18px'}>
            Ethena
          </Heading>
          <HStack spacing={'2'}>
            <Tag size={'sm'}>Staking</Tag>
            <Tag size={'sm'}>Layer2</Tag>
          </HStack>
          <Text maxW={'800px'}>Synthetic Dollar and Internet Native Yield</Text>
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
        </VStack>
      </Center>
      <Container
        maxW={'container.lg'}
        borderStyle={'solid'}
        borderWidth={'0.5px'}
        borderRadius={'md'}
        borderColor="gray.600"
        boxShadow="xs"
        rounded="md"
        p={6}
        mt="12"
      >
        <Flex>
          <Box
            borderStyle={'solid'}
            borderWidth={'0'}
            borderRadius={'md'}
            borderColor="gray.600"
            boxShadow="xs"
            rounded="md"
            width={'40%'}
            p="4"
          >
            <SimpleGrid columns={1} spacing={2} fontSize={'14px'}>
              <HStack spacing={'6'}>
                <Text>Token</Text>
                <Text color={'gray'}>ENA</Text>
              </HStack>
              <HStack spacing={'6'}>
                <Text>Contract Address</Text>
                <Text color={'gray'}>0x000000</Text>
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
          </Box>
          <Box
            borderStyle={'solid'}
            borderLeftWidth={'0.5px'}
            borderRadius={'md'}
            borderColor="gray.600"
            boxShadow="xs"
            p="4"
            rounded="md"
            width={'60%'}
          >
            <Box w={'80%'} ml="14">
              <Stepper index={activeStep} size={'sm'} colorScheme="pink">
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Text textAlign={'center'} my="8">
              Deposite Eth to earn token rewards
            </Text>
            <Center my={6}>
              <HStack>
                <Input
                  w="240px"
                  variant="outline"
                  size="sm"
                  color="#fff"
                  textAlign={'left'}
                  value={depositeAmount}
                  onChange={(e) => depositeHandler(e.target.value)}
                  placeholder="Input token amount"
                />
                <Button size="sm" variant="solid" rounded={'4px'} colorScheme="pink">
                  Deposite
                </Button>
              </HStack>
            </Center>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LaunchpadDetail;
