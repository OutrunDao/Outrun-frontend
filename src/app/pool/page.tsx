"use client"

import Link from 'next/link'
import { chakra, Text, useColorMode, useColorModeValue, Heading ,Container, Button, Center } from '@chakra-ui/react'

const PoolIndex = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  const bgColor = useColorModeValue('#000', 'skyblue');
  

  return (
    <Container className="pool-box" marginTop="120px" border="1px solid antiquewhite">
      <Center>
        <Center  height="300px" width="800px" justifyContent="space-between" padding="32px" borderRadius="12px">
          <Button  variant='outline'>
            <Link href="/pool/pair">Create A Pair</Link>
          </Button>
          <Button variant="custom">Import Pool</Button>
          <Button color="#fff" colorScheme='orange'>Add Liquidity</Button>
        </Center>
      </Center>
    </Container>
  )
}

export default PoolIndex