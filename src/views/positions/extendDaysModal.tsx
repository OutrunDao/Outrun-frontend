'use client';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Stack,
  Text,
  useToast,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  useDisclosure,
  VStack,
  ModalFooter,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { isAddress } from 'viem';

const minLockupDays = 7;
const maxLockupDays = 365;
const oneDaySec = 24 * 3600;

export default function ExtendDaysModal({ deadline, onConfirmExtend }: { deadline: number; onConfirmExtend: (days: number) => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sliderValue, setSliderValue] = useState(7);
  const toast = useToast();

  const minDayCalc = useMemo(() => {
    const minLockSecond = minLockupDays * oneDaySec; // 最小锁定秒数，minLockupDays从合约获得
    const newDeadLine = minLockSecond + Math.floor(new Date().getTime() / 1000); // 最小新DeadLine，currentTimestampSecond是系统当前时间戳，单位为秒
    return Math.max(Math.floor((newDeadLine - deadline) / oneDaySec), 1);
  }, [deadline]);

  const maxDayCalc = useMemo(() => {
    const maxLockSecond = maxLockupDays * oneDaySec; // 最小锁定秒数，minLockupDays从合约获得
    const newDeadLine = maxLockSecond + Math.floor(new Date().getTime() / 1000); // 最小新DeadLine，currentTimestampSecond是系统当前时间戳，单位为秒
    return Math.max(Math.floor((newDeadLine - deadline) / oneDaySec), 1);
  }, [deadline]);
  function _onConfirm() {
    if (sliderValue < minDayCalc || sliderValue > maxDayCalc)
      return toast({
        status: 'error',
        title: '输入天数错误',
      });
    onConfirmExtend(sliderValue);
    onClose();
  }

  return (
    <>
      <Button size={'xs'} rounded={4} color={'brand.500'} onClick={onOpen}>
        extend days
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={36} bgColor={'#0d0703'} borderColor={'#515151'} borderWidth={'1px'} color="#fff">
          <ModalHeader>Extend position days</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container borderColor="gray.600" boxShadow="xs" rounded="md" borderWidth={'0.5px'} borderStyle={'solid'} padding="6px 0" borderTopRadius={0}>
              <Flex>
                <Center textAlign={'center'} width={'100px'}>
                  <Text mr="14px">days</Text>
                  <Divider orientation="vertical" height={'20px'} />
                </Center>
                <Center width={'100%'}>
                  <Input variant="main" size="sm" textAlign={'right'} value={sliderValue} onChange={(e) => setSliderValue(+e.target.value)} placeholder="withdraw amount" />
                </Center>
              </Flex>
            </Container>
            <Center mt="16px">
              <Slider aria-label="slider-ex-4" width={'98%'} min={minDayCalc} max={maxDayCalc} value={sliderValue} onChange={(val) => setSliderValue(val)}>
                {/* <SliderMark value={7} mt="1" ml="-2.5" fontSize="sm">
            7
          </SliderMark>
          <SliderMark value={14} mt="1" ml="-2.5" fontSize="sm">
            14
          </SliderMark>
          <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
            50
          </SliderMark>
          <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
            75
          </SliderMark> */}
                {/* <SliderMark value={sliderValue} textAlign="center" fontSize={'12px'} bg="teal" color="white" mt="-8" ml="-5" w="12">
            {sliderValue}
          </SliderMark> */}
                <SliderTrack bg="teal">
                  <SliderFilledTrack bg="teal" />
                </SliderTrack>
                <SliderThumb boxSize={3}></SliderThumb>
              </Slider>
            </Center>
            {/* <br /> */}
            {/* <Center>
              <Text fontSize={13} color="gray" my={2}>
                Your lock end date will be 2028年4月06日周四 GMT+8 08:00
              </Text>
            </Center> */}
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button rounded={4} onClick={onClose}>
                cancel
              </Button>
              <Button rounded={4} colorScheme="teal" onClick={_onConfirm}>
                confirm
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
