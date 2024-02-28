'use client';

import { Button, Container, Heading, Input, InputGroup, Text, VStack } from '@chakra-ui/react';
import TokenSelect from '@/components/TokenSelect';

export default function Swap() {
  return (
    <Container
      w={'480px'}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderRadius={'md'}
      borderColor={'#3aaa7a'}
      textColor={'#fff'}
      padding={'2rem'}
      textAlign={'center'}
      mt={'6rem'}
    >
      <Heading as="h3" size="lg" fontWeight={''}>
        SWAP
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
          swap token
        </Button>
      </VStack>
    </Container>
  );
}
