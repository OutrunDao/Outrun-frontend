'use client';
import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  HStack,
  Heading,
  Image,
  Icon,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverBody,
  PopoverTrigger,
  PopoverContent,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Silkscreen } from 'next/font/google';
import { IoSwapVertical } from 'react-icons/io5';
import { PiSwimmingPool } from 'react-icons/pi';
import { RiCoinFill } from 'react-icons/ri';
import { GiMiner } from 'react-icons/gi';
import { FaHotjar } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { TbExchange } from 'react-icons/tb';
import { GiProfit } from 'react-icons/gi';

const silk = Silkscreen({ subsets: ['latin'], weight: '700' });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
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
            <Button variant="link" color={pathname === '/swap' ? 'brand.500' : 'grey.600'} fontSize={14} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={IoSwapVertical}></Icon>}>
              <Link href={'/swap'} prefetch={true}>
                Swap
              </Link>
            </Button>
            <Button variant="link" color={pathname === '/pool' ? 'brand.500' : 'grey.600'} fontSize={14} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={PiSwimmingPool}></Icon>}>
              <Link href={'/pool'} prefetch={true}>
                Pool
              </Link>
            </Button>
            <Popover trigger="hover">
              <PopoverTrigger>
                <Button
                  variant="link"
                  color={['/mint-stake', '/mint-stake/stake', '/positions'].includes(pathname) ? 'brand.500' : 'grey.600'}
                  fontSize={14}
                  fontWeight={'normal'}
                  onClick={() => router.push('/mint-stake')}
                  leftIcon={<Icon fontSize={16} as={GiMiner}></Icon>}
                >
                  {/* <Link href={'/mint-stake'} prefetch={true}> */}
                  Liquid Staking
                  {/* </Link> */}
                </Button>
              </PopoverTrigger>
              <PopoverContent background={'#0d0703'} width={'120px'} mt={'10px'} borderColor={'#383433'} borderRadius={2} paddingY={2}>
                <VStack alignItems={'flex-start'}>
                  <Button pl={2} variant="link" color={pathname === '/swap' ? 'brand.500' : 'grey.600'} fontSize={14} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={TbExchange}></Icon>}>
                    <Link href={'/mint-stake'} prefetch={true}>
                      Mint
                    </Link>
                  </Button>
                  <Divider />
                  <Button pl={2} variant="link" fontSize={14} color={'grey.600'} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={GiMiner}></Icon>}>
                    <Link href={'/mint-stake/stake'} prefetch={true}>
                      Staking
                    </Link>
                  </Button>
                  <Divider />

                  <Button pl={2} variant="link" fontSize={14} color={'grey.600'} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={RiCoinFill}></Icon>}>
                    <Link href={'/positions'}>Position</Link>
                  </Button>
                  <Divider />

                  <Button pl={2} variant="link" fontSize={14} color={'grey.600'} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={GiProfit}></Icon>}>
                    <Link href={'/pool'} prefetch={true}>
                      Yield Pool
                    </Link>
                  </Button>
                </VStack>
              </PopoverContent>
            </Popover>
            {/* <Button
              variant="link"
              color={['/mint-stake', '/mint-stake/stake'].includes(pathname) ? 'brand.500' : 'grey.600'}
              fontSize={14}
              fontWeight={'normal'}
              leftIcon={<Icon fontSize={16} as={GiMiner}></Icon>}
            >
              <Link href={'/mint-stake'} prefetch={true}>
                Liquid Staking
              </Link>
            </Button> */}
            {/* <Button variant="link" color={pathname === '/stake' ? 'brand.500' : 'grey.600'} fontSize={14} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={GiMiner}></Icon>}>
              <Link href={'/stake'} prefetch={true}>
                Stake
              </Link>
            </Button> */}

            <Button variant="link" color={pathname === '/launchpad' ? 'brand.500' : 'grey.600'} fontSize={14} fontWeight={'normal'} leftIcon={<Icon fontSize={16} as={FaHotjar}></Icon>}>
              <Link href={'/launchpad'} prefetch={true}>
                Launchpad
              </Link>
            </Button>
          </HStack>
        </Box>
        <Spacer />
        <Box>
          <HStack mr={6}>
            <w3m-button />
          </HStack>
        </Box>
      </Flex>
      <Container maxW={'container.xl'}>{children}</Container>
    </Box>
  );
}
