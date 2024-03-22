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

export default function TokenSelect({
  onSelect,
  selectedToken,
}: {
  onSelect: (token: TokenInfo) => void;
  selectedToken?: TokenInfo;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          selectedToken && (
            <Image
              src={selectedToken.logoURI}
              width={'20px'}
              height={'20px'}
              alt={selectedToken.symbol}
            ></Image>
          )
        }
        rightIcon={<ChevronDownIcon />}
      >
        {selectedToken ? selectedToken.symbol : 'Select Token'}
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
                    onClick={() => {
                      onSelect(token);
                      onClose();
                    }}
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
