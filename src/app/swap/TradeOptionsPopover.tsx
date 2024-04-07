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

import React from 'react';

export const TradeOptionsPopover = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
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
            <RadioGroup>
              <Stack spacing={2} direction="row">
                <Radio value="1" size={'sm'}>
                  0.1%
                </Radio>
                <Radio value="2" size="sm">
                  0.5%
                </Radio>
                <Radio value="3" size="sm">
                  1%
                </Radio>
                <Input variant="outline" placeholder="5" size={'sm'} color={'#fff'} width="50px" />
                <Center>
                  <Text>%</Text>
                </Center>
              </Stack>
            </RadioGroup>
            <Heading as="h6" size="xs" mb="1rem" mt="1rem">
              Transaction Deadline (min)
            </Heading>
            <RadioGroup>
              <Stack spacing={2} direction="row">
                <Radio value="1" size={'sm'}>
                  10m
                </Radio>
                <Radio value="2" size="sm">
                  20m
                </Radio>
                <Radio value="3" size="sm">
                  30m
                </Radio>
                <Input variant="outline" placeholder="60" size={'sm'} color={'#fff'} width="50px" />
                <Center>
                  <Text>minutes</Text>
                </Center>
              </Stack>
            </RadioGroup>
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};
