'use client';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Container } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <Container w={'480px'} p={6} mt="14" mb={6}>
      <Tabs>
        <TabList>
          <Tab fontWeight={'bold'} onClick={() => router.push('/mint-stake')}>
            Mint & Redeem
          </Tab>
          <Tab fontWeight={'bold'} onClick={() => router.push('/mint-stake/stake')}>
            Stake
          </Tab>
          <Tab fontWeight={'bold'} onClick={() => router.push('/mint-stake/positions')}>
            Positions
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{children}</TabPanel>
          <TabPanel>{children}</TabPanel>
          <TabPanel>{children}</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
