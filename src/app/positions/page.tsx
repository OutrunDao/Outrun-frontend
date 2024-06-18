import { headers } from 'next/headers';

import type { Metadata } from 'next';
import { Box } from '@chakra-ui/react';
import Page from '@/views/positions/page';

export const metadata: Metadata = {
  title: 'Stake Positions | OUTRUN',
  description: 'Outrun app',
};

export default Page;
