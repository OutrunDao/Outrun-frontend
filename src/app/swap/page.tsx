'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import TokenSelect from '@/components/TokenSelect';
import { tokenList } from '@/tokens/list';
import { useMemo, useState } from 'react';
import { TokenInfo } from '@uniswap/token-lists';
import { ArrowDownIcon, SettingsIcon } from '@chakra-ui/icons';
export default function Swap() {
  const [pairs, setPairs] = useState<Array<TokenInfo | undefined>>([tokenList.tokens[0]]);
  const [pairsInput, setPairsInput] = useState<Array<string>>(['', '']);
  const onSelctToken = (token: TokenInfo, index: number) => {
    let nextIndex = (index + 1) % 2;
    pairs[index] = token;
    if (pairs[index] && pairs[index]!.address === (pairs[nextIndex] && pairs[nextIndex]!.address))
      pairs[(index + 1) % 2] = undefined;
    setPairs([...pairs]);
  };
  const onReverse = () => {
    setPairs([pairs[1], pairs[0]]);
    setPairsInput([pairsInput[1], pairsInput[0]]);
  };
  const onPairsInput = (value: string, index: number) => {
    setPairsInput((pairsInput) => {
      pairsInput[index] = value;
      return [...pairsInput];
    });
  };
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
      <Container textAlign={'right'}>
        <SettingsIcon></SettingsIcon>
      </Container>
      <VStack mt={'2.5rem'} spacing={4} paddingX={'2rem'} fontSize={16}>
        <InputGroup>
          <Text color={'#3aaa7a'} ml={4} mt={'6px'}>
            INPUT:{' '}
          </Text>
          <Input
            variant="unstyled"
            size="lg"
            placeholder="Intput token amount"
            ml={4}
            mr={6}
            value={pairsInput[0]}
            onChange={(e) => onPairsInput(e.target.value, 0)}
          />
          <TokenSelect selectedToken={pairs[0]} onSelect={(token) => onSelctToken(token, 0)} />
          <br />
        </InputGroup>
        <Container textAlign={'right'} pr={0}>
          <Text fontSize={'xs'}>Balance: 12</Text>
        </Container>
        <Container>
          <IconButton
            icon={<ArrowDownIcon />}
            colorScheme="teal"
            aria-label="ArrowDown"
            onClick={onReverse}
          />
        </Container>
        <InputGroup>
          <Text color={'#3aaa7a'} mt={'6px'}>
            OUTPUT:{' '}
          </Text>
          <Input
            variant="unstyled"
            size="lg"
            placeholder="Output token amount"
            ml={4}
            mr={6}
            value={pairsInput[1]}
            onChange={(e) => onPairsInput(e.target.value, 1)}
          />
          <TokenSelect selectedToken={pairs[1]} onSelect={(token) => onSelctToken(token, 1)} />
        </InputGroup>
        <Container textAlign={'right'} pr={0}>
          <Text fontSize={'xs'}>1WETH = 1222 bb</Text>
        </Container>
        <InputGroup>
          <Text color={'#3aaa7a'} mt={'6px'}>
            tolerance:
          </Text>
          <RadioGroup>
            <Stack direction="row">
              <Radio size="sm" value="0.1">
                0.1%
              </Radio>
              <Radio size="sm" value="0.5">
                0.5%
              </Radio>
              <Radio size="sm" value="1">
                1%
              </Radio>
            </Stack>
          </RadioGroup>
          <Input variant="unstyled" size="xs" placeholder="5%" width={'4rem'} ml={3} />
        </InputGroup>
        <InputGroup>
          <Text color={'#3aaa7a'} mt={'6px'}>
            DeadLine
          </Text>
          <Input variant="unstyled" size="xs" placeholder="10" width={'4rem'} ml={1} />
          <Text color={'#3aaa7a'}> Minutes</Text>
        </InputGroup>
        <Button width={'100%'} mt={4} size="lg" variant="custom">
          swap token
        </Button>
      </VStack>
    </Container>
  );
}
