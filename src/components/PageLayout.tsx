'use client';
import { Box, Flex, Spacer, Text, Button, HStack, Heading, Image, Icon, Container } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Silkscreen } from 'next/font/google';
import { IoSwapVertical } from 'react-icons/io5';
import { PiSwimmingPool } from 'react-icons/pi';
import { RiCoinFill } from 'react-icons/ri';
import { GiMiner } from 'react-icons/gi';
import { FaHotjar } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const silk = Silkscreen({ subsets: ['latin'], weight: '700' });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
            <Button
              variant="link"
              color={pathname === '/swap' ? 'brand.500' : 'grey.600'}
              fontSize={14}
              fontWeight={'normal'}
              leftIcon={<Icon fontSize={16} as={IoSwapVertical}></Icon>}
            >
              <Link href={'/swap'}>Swap</Link>
            </Button>
            <Button
              variant="link"
              color={pathname === '/pool' ? 'brand.500' : 'grey.600'}
              fontSize={14}
              fontWeight={'normal'}
              leftIcon={<Icon fontSize={16} as={PiSwimmingPool}></Icon>}
            >
              <Link href={'/pool'}>Pool</Link>
            </Button>
            <Button
              variant="link"
              color={pathname === '/stake' ? 'brand.500' : 'grey.600'}
              fontSize={14}
              fontWeight={'normal'}
              leftIcon={<Icon fontSize={16} as={GiMiner}></Icon>}
            >
              <Link href={'/stake'}>Stake</Link>
            </Button>
            <Button
              variant="link"
              color={pathname === '/position' ? 'brand.500' : 'grey.600'}
              fontSize={14}
              fontWeight={'normal'}
              leftIcon={<Icon fontSize={16} as={RiCoinFill}></Icon>}
            >
              <Link href={'/position'}>Positions</Link>
            </Button>
            <Button
              variant="link"
              color={pathname === '/launchpad' ? 'brand.500' : 'grey.600'}
              fontSize={14}
              fontWeight={'normal'}
              leftIcon={<Icon fontSize={16} as={FaHotjar}></Icon>}
            >
              <Link href={'/launchpad'}>Launchpad</Link>
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
      <Container maxW={'container.xl'}>{children}</Container>
    </Box>
  );
}
