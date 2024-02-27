"use client";
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
} from "@chakra-ui/react";

export default function TokenSelect() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="teal" variant="outline" onClick={onOpen} size="sm">
        ETH
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} bgColor={"rgb(29 12 23)"} color="#fff" pb={10}>
          <ModalHeader>Select Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="outline"
              placeholder="Search Name or paste address"
              size="lg"
            />
            <Heading as="h5" size="md" mt={6}>
              Token Name
            </Heading>
            <VStack spacing={2} mt={4}>
              <Button
                colorScheme="teal"
                justifyContent={"left"}
                variant="ghost"
                w={"100%"}
              >
                USDC
              </Button>
              <Button
                colorScheme="teal"
                variant="ghost"
                justifyContent={"left"}
                w={"100%"}
              >
                USDT
              </Button>
              <Button
                colorScheme="teal"
                variant="ghost"
                justifyContent={"left"}
                w={"100%"}
              >
                WETH
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
