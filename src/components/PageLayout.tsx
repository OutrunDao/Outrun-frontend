'use client';
import { Box, Flex, Spacer, Text, Button, HStack, Heading, Image, Container } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Silkscreen } from 'next/font/google';

const silk = Silkscreen({ subsets: ['latin'], weight: '700' });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Flex align="center" borderColor="gray.600" borderBottomStyle={'solid'} borderBottomWidth={'0.5px'}>
        <Flex p={'12px 24px'}>
          <Heading as="h1" fontSize={24} fontWeight="bold" textColor="brand.500" style={silk.style}>
            Outrun
          </Heading>
        </Flex>
        <Box ml={'60px'}>
          <HStack spacing={'40px'} fontSize={14}>
            <Button variant="link" color="grey.600" fontSize={14} fontWeight={'normal'}>
              <Link href={'/swap'}>Swap</Link>
            </Button>
            <Button variant="link" color="grey.600" fontSize={14} fontWeight={'normal'}>
              <Link href={'/pool'}>Pool</Link>
            </Button>
            <Button variant="link" color="grey.600" fontSize={14} fontWeight={'normal'}>
              <Link href={'/stake'}>Stake</Link>
            </Button>
          </HStack>
        </Box>
        <Spacer />
        <Box>
          <HStack>
            <w3m-button />
          </HStack>
        </Box>
      </Flex>
      <Container>{children}</Container>
    </Box>
  );
}
