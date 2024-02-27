"use client";

import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import TokenSelect from "@/components/TokenSelect";

export default function Swap() {
  return (
    <Container
      w={"460px"}
      borderStyle={"solid"}
      borderWidth={"1px"}
      borderRadius={"md"}
      borderColor={"#3aaa7a"}
      textColor={"#fff"}
      padding={"2rem"}
      textAlign={"center"}
      mt={"6rem"}
    >
      <Heading as="h3" size="lg" fontWeight={""}>
        Swap
      </Heading>
      <VStack mt={"2rem"} spacing={4} paddingX={"2rem"} fontSize={16}>
        <InputGroup>
          <Text color={"#3aaa7a"} ml={4}>
            INPUT:{" "}
          </Text>
          <Input
            variant="unstyled"
            size="lg"
            placeholder="Intput token amount"
            ml={4}
          />
          <TokenSelect />
        </InputGroup>
        <InputGroup>
          <Text color={"#3aaa7a"}>OUTPUT: </Text>
          <Input
            variant="unstyled"
            size="lg"
            placeholder="Output token amount"
            ml={4}
          />
          <TokenSelect />
        </InputGroup>
        <Button colorScheme="teal" width={"100%"} mt={4}>
          swap token
        </Button>
      </VStack>
    </Container>
  );
}
