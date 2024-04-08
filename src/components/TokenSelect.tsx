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
  Box,
} from '@chakra-ui/react';
import { tokenList } from '@/tokens/list';
import { ChevronDownIcon, QuestionIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { TokenInfo } from '@uniswap/token-lists';
import { Token } from '@/packages/swap-core';
import { Native } from '@/packages/swap-sdk';

function getTokenRaw(symbol: string | undefined, chainId: number, address?: string): TokenInfo | undefined {
  if (!chainId || (!symbol && !address)) {
    return undefined;
  }
  if (symbol === 'ETH') return undefined;
  return tokenList.tokens.find(
    (token) =>
      ((token.symbol && token.symbol === symbol) || (token.address && token.address === address)) &&
      token.chainId === chainId
  );
}

export function getToken(symbol: string, chainId: number): Token | Native | undefined {
  if (symbol === 'ETH') return Native.onChain(chainId);
  const token = getTokenRaw(symbol, chainId);
  if (!token) {
    return undefined;
  }
  return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name);
}

export default function TokenSelect({
  onSelect,
  defaultSymbol,
  token,
  tokenDisable,
  chainId,
}: {
  onSelect: (token: Token | Native) => void;
  defaultSymbol?: string;
  token?: Token | Native;
  tokenDisable?: Token | Native;
  chainId: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(getTokenRaw(defaultSymbol, chainId));
  const [isNative, setIsNative] = useState(defaultSymbol === 'ETH');
  function handleSelect(_token: TokenInfo) {
    setTokenInfo(_token);
    setIsNative(false);
    onSelect(new Token(_token.chainId, _token.address, _token.decimals, _token.symbol, _token.name));
    onClose();
  }
  function handleSelectNative() {
    setTokenInfo(undefined);
    setIsNative(true);
    onSelect(Native.onChain(chainId));
    onClose();
  }
  useEffect(() => {
    // console.log('token upate', token);

    if (token) {
      // @ts-ignore
      setTokenInfo(getTokenRaw(token.symbol, chainId, token.address));
    }
  }, [token]);
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
          tokenInfo && tokenInfo.logoURI ? (
            <Image
              src={tokenInfo.logoURI}
              width={'15px'}
              height={'15px'}
              alt={tokenInfo.symbol}
              style={{ marginLeft: '6px' }}
            ></Image>
          ) : (
            <QuestionIcon></QuestionIcon>
          )
        }
        rightIcon={<ChevronDownIcon />}
      >
        {tokenInfo ? tokenInfo.symbol : isNative ? 'ETH' : 'Select Token'}
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
            <Box height={300} overflow={'scroll'} style={{ scrollbarWidth: 'none' }}>
              <VStack spacing={2} mt={4}>
                <Button
                  colorScheme="teal"
                  justifyContent={'left'}
                  variant="ghost"
                  isDisabled={tokenDisable?.isNative}
                  w={'100%'}
                  leftIcon={<QuestionIcon></QuestionIcon>}
                  onClick={() => handleSelectNative()}
                >
                  ETH
                </Button>
                {tokenList.tokens.map((token) => {
                  return (
                    <Button
                      colorScheme="teal"
                      justifyContent={'left'}
                      variant="ghost"
                      w={'100%'}
                      isDisabled={
                        // @ts-ignore
                        tokenDisable?.address === token.address
                      }
                      leftIcon={
                        !token.logoURI ? (
                          <QuestionIcon></QuestionIcon>
                        ) : (
                          <Image src={token.logoURI} width={'20px'} height={'20px'} alt={token.symbol} />
                        )
                      }
                      key={token.address}
                      onClick={() => handleSelect(token)}
                    >
                      {token.symbol}
                    </Button>
                  );
                })}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
