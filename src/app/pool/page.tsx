'use client';
import Link from 'next/link';
import {
  Box,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
  Heading,
  Container,
  Button,
  Input,
  InputGroup,
  VStack,
  Center,
} from '@chakra-ui/react';
import { PiSwimmingPoolDuotone } from 'react-icons/pi';
import TokenSelect from '@/components/TokenSelect';

const PoolIndex = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('#000', 'skyblue');

  return (
    <>
      <Container
        w={'480px'}
        borderStyle={'solid'}
        borderWidth={'1px'}
        borderRadius={'md'}
        borderColor={'#D3027D'}
        textColor={'#fff'}
        padding={'2rem'}
        textAlign={'center'}
        mt={'6rem'}
      >
        <Heading as="h3" size="lg" fontWeight={''}>
          POOL
        </Heading>
        <VStack mt={'2.5rem'} spacing={4} paddingX={'2rem'} fontSize={16}>
          <InputGroup>
            <Text color={'#3aaa7a'} ml={4} mt={'6px'}>
              INPUT:{' '}
            </Text>
            <Input variant="unstyled" size="lg" placeholder="Intput token amount" ml={4} mr={6} />
            <TokenSelect selectedTokenSymbol="WETH" />
          </InputGroup>
          <InputGroup>
            <Text color={'#3aaa7a'} mt={'6px'}>
              OUTPUT:{' '}
            </Text>
            <Input variant="unstyled" size="lg" placeholder="Output token amount" ml={4} mr={6} />
            <TokenSelect selectedTokenSymbol="USDC" />
          </InputGroup>
          <Button width={'100%'} mt={4} size="lg" variant="custom">
            Add Liquidity
          </Button>
        </VStack>
      </Container>
      <Container>
        <Center marginTop="60px">
          <Icon color="#666" boxSize={16} as={PiSwimmingPoolDuotone}></Icon>
        </Center>
        <Text align="center" color="#999" fontSize="16px" marginTop="12px">
          Your have no active liquidity positions.
        </Text>
      </Container>
    </>
  );
};

export default PoolIndex;
