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

export default function TokenSelect() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="teal" variant="outline" onClick={onOpen} size="sm">
        ETH
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
