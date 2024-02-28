import { Box, Text, Tag, Flex, Input, Select, Button, Center,Container } from '@chakra-ui/react'

export default function Pair () {
  return(
    <Container color="#fff">
      <Box padding="32px" border="1px solid #D3027D" bgColor="transparent" borderRadius="10px" height="600px" width="400px" marginTop="120px" >
        <Text textAlign="center" marginBottom="12px">Add Liquidity</Text>
        
        <Box border=".1px solid #D3027D" padding="22px" borderRadius="12px">
          <Center>
            <Input width="220px" outline="none" placeholder='Input Amount' marginRight="12px" />
            <Select width="120px">
              <option value='option1'>ETH</option>
              <option value='option2'>AAVE</option>
              <option value='option3'>1Inch</option>
            </Select>
          </Center>
          <Flex justifyContent="right">
            <Tag variant='subtle' colorScheme='cyan' marginTop="12px" size="lg">Balance: 12</Tag>
          </Flex>
        </Box>

        <Text textAlign="center" fontSize="32px" margin="32px">+</Text>
        
        <Box border=".1px solid #D3027D" padding="22px" borderRadius="12px"> 
          <Center>
            <Input width="220px" outline="none" placeholder='Input Amount' marginRight="12px" />
            <Select width="120px">
              <option value='option1'>ETH</option>
              <option value='option2'>AAVE</option>
              <option value='option3'>1Inch</option>
            </Select>
          </Center>
          <Flex justifyContent="right">
            <Tag variant='subtle' colorScheme='cyan' marginTop="12px" size="lg">Balance: 12</Tag>
          </Flex>
        </Box>

        <Center>
          <Button width="260px" marginTop="32px" size="lg" variant="custom" fontSize="16px">Confirm</Button>
        </Center>
      </Box>
    </Container>
  )
}