"use client"
import Link from 'next/link'
import { Box, Icon, Text, useColorMode, useColorModeValue, Heading ,Container, Button, Center } from '@chakra-ui/react'
import { PiSwimmingPoolDuotone } from "react-icons/pi";


const PoolIndex = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  const bgColor = useColorModeValue('#000', 'skyblue');
  

  return (
    <Container className="pool-box" marginTop="120px" borderRadius="12px" padding="32px" background = 'linear-gradient(180deg,_rgba(17,_20,_12,_0.24)_27.54%,_rgba(17,_20,_12,_0.37)_58.11%,_rgba(17,_20,_12,_0.63)_100%)'
    >
      <Center marginTop="32px">
        <Heading textAlign="center">Positions</Heading>
        <Button variant="custom" marginLeft="32px">
          <Link href="/pool/pair">Add Liquidity</Link>
        </Button>
      </Center>
      
      <Container border="1px solid #D3027D" padding="32px" marginTop="32px" width="600px" borderRadius="12px" height="300px" >
        <Center marginTop="60px">
          <Icon color="#666" boxSize={16} as={PiSwimmingPoolDuotone}></Icon>
        </Center>
        <Text align="center" color="#999" fontSize="16px" marginTop="12px">
          Your active V3 liquidity positions will appear here.
        </Text>
      </Container>
    </Container>
  )
}

export default PoolIndex