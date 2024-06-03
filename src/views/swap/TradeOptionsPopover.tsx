import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  Button,
  useDisclosure,
  IconButton,
  Heading,
  Radio,
  RadioGroup,
  Text,
  Center,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

import React, { useState } from 'react';

export const TradeOptionsPopover = ({
  onSelect,
}: {
  onSelect: (slippageTolerance: string, deadline: string) => void;
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [slippageTolerance, setSlippageTolerance] = useState('1');
  const [slippageToleranceInput, setSlippageToleranceInput] = useState('');
  const [deadlineInput, setDeadlineInput] = useState('10');
  const firstFieldRef = React.useRef(null);
  function onSlippageHandler(v: string) {
    setSlippageTolerance(v);
  }
  function onDeadlineHandler(v: string) {
    setDeadlineInput(v);
  }
  function onSlippageInputHandler(v: string) {
    setSlippageToleranceInput(v);
    v = v.trim();
    if (v) {
      setSlippageTolerance('');
    } else {
      setSlippageTolerance('2');
    }
  }
  function onCloseHandler() {
    onSelect(slippageToleranceInput || slippageTolerance, deadlineInput);
    onClose();
  }
  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onCloseHandler}
        placement="bottom"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="swap options"
            variant="forIcon"
            colorScheme="gray"
            size="md"
            icon={<SettingsIcon />}
            onClick={onOpen}
          ></IconButton>
        </PopoverTrigger>
        <PopoverContent p={5} bg={'#0d0703'}>
          <PopoverArrow />
          <Box>
            <Heading as="h6" size="xs" mb="1rem">
              Slippage tolerance
            </Heading>
            <RadioGroup value={slippageTolerance} onChange={onSlippageHandler}>
              <Stack spacing={2} direction="row">
                <Radio value="1" size={'sm'}>
                  1%
                </Radio>
                <Radio value="2" size="sm">
                  2%
                </Radio>
                <Radio value="3" size="sm">
                  3%
                </Radio>
                <Input
                  variant="outline"
                  placeholder="5"
                  size={'sm'}
                  color={'#fff'}
                  value={slippageToleranceInput}
                  width="50px"
                  onChange={(e) => onSlippageInputHandler(e.target.value)}
                />
                <Center>
                  <Text>%</Text>
                </Center>
              </Stack>
            </RadioGroup>
            <Heading as="h6" size="xs" mb="1rem" mt="1rem">
              Transaction Deadline (min)
            </Heading>
            <RadioGroup value={deadlineInput} onChange={onDeadlineHandler}>
              <Stack spacing={2} direction="row">
                <Radio value="10" size={'sm'}>
                  10m
                </Radio>
                <Radio value="20" size="sm">
                  20m
                </Radio>
                <Radio value="30" size="sm">
                  30m
                </Radio>
                {/* <Input variant="outline" placeholder="60" size={'sm'} color={'#fff'} width="50px" />
                <Center>
                  <Text>minutes</Text>
                </Center> */}
              </Stack>
            </RadioGroup>
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};
