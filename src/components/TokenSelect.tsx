'use client';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  VStack,
  Input,
  Image,
} from '@chakra-ui/react';
import { tokenList } from '@/tokens/list';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { TokenInfo } from '@uniswap/token-lists';
import { Token } from '@/packages/swap-core';

function getTokenRaw(symbol: string | undefined, chainId: number): TokenInfo | undefined {
  if (!chainId || !symbol) {
    return undefined;
  }
  return tokenList.tokens.find((token) => token.symbol === symbol && token.chainId === chainId);
}

export function getToken(symbol: string, chainId: number): Token | undefined {
  const token = getTokenRaw(symbol, chainId);
  if (!token) {
    return undefined;
  }
  return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name);
}

export default function TokenSelect({
  onSelect,
  defaultSymbol,
  chainId,
}: {
  onSelect: (token: Token) => void;
  defaultSymbol?: string;
  chainId: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(getTokenRaw(defaultSymbol, chainId));
  function handleSelect(token: TokenInfo) {
    setTokenInfo(token);
    onSelect(new Token(token.chainId, token.address, token.decimals, token.symbol, token.name));
    onClose();
  }
  return (
    <>
      <Button
        variant="ghost"
        colorScheme="custom"
        onClick={onOpen}
        size="sm"
        bg={'transparent'}
        color={'#fff'}
        px={'10px'}
        leftIcon={
          tokenInfo && (
            <Image src={tokenInfo.logoURI} width={'20px'} height={'20px'} alt={tokenInfo.symbol}></Image>
          )
        }
        rightIcon={<ChevronDownIcon />}
      >
        {tokenInfo ? tokenInfo.symbol : 'Select Token'}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} bgColor={'rgb(29 12 23)'} color="#fff" pb={10}>
          <ModalHeader>Select Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input variant="outline" placeholder="Search Name or paste address" size="lg" />
            <Heading as="h5" size="md" mt={6}>
              Token Name
            </Heading>
            <VStack spacing={2} mt={4}>
              {tokenList.tokens.map((token) => {
                return (
                  <Button
                    colorScheme="teal"
                    justifyContent={'left'}
                    variant="ghost"
                    w={'100%'}
                    leftIcon={<Image src={token.logoURI} width={'20px'} height={'20px'} alt={token.symbol} />}
                    key={token.address}
                    onClick={() => handleSelect(token)}
                  >
                    {token.symbol}
                  </Button>
                );
              })}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
