'use client';
import { Box, Flex, Spacer, Text, Button, HStack, Heading, Image } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Silkscreen } from 'next/font/google';

const silk = Silkscreen({ subsets: ['latin'], weight: '700' });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box bgImage="url(../assets/bg.jpeg)" bgColor="rgb(29 12 23)" height={'100vh'}>
      <Flex align="center">
        <Flex p={'24px '} align="center">
          {/* <Box boxSize={40}><Logo width={40} height={40}></Logo></Box> */}
          <Heading as="h1" fontSize={30} fontWeight="bold" textColor="#d3027d" style={silk.style}>
            Outrun
          </Heading>
        </Flex>
        <Box ml={'60px'}>
          <HStack spacing={'40px'}>
            <Text>
              <Link href={'/swap'}>Swap</Link>
            </Text>
            <Text>
              <Link href={'/pool'}>Pool</Link>
            </Text>
            <Text>
              <Link href={'/stack'}>Stack</Link>
            </Text>
          </HStack>
        </Box>
        <Spacer />
        <Box>
          <HStack>
            <w3m-button />
          </HStack>
        </Box>
      </Flex>
      {children}
    </Box>
  );
}
