'use client';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Container } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [index, setIndex] = useState(pathname === '/mint-stake/stake' ? 1 : 0);
  function onSelect(index: number) {
    setIndex(index);
    if (index === 1) return router.push('/mint-stake/stake');
    router.push('/mint-stake');
  }
  useEffect(() => {
    setIndex(pathname === '/mint-stake/stake' ? 1 : 0);
  }, [pathname]);

  return (
    <Container w={'480px'} p={6} mt="14" mb={6}>
      <Tabs index={index}>
        <TabList>
          <Tab fontWeight={'bold'} onClick={() => onSelect(0)}>
            Mint
          </Tab>
          <Tab fontWeight={'bold'} onClick={() => onSelect(1)}>
            Stake
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel paddingX={0}>{children}</TabPanel>
          <TabPanel paddingX={0}>{children}</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
