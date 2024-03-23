import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  Text,
  InputGroup,
  RadioGroup,
  Stack,
  Radio,
  Input,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

export function TradeSettingsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <SettingsIcon></SettingsIcon>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Trade Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack mt={'2.5rem'} spacing={4} paddingX={'2rem'} fontSize={16}>
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
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
