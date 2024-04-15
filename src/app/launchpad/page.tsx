import Page from '@/views/launchpad/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launchpad | OUTRN',
};

export default async function LaunchpadServerPage({ params: { id } }: { params: { id: string } }) {
  console.log(id);

  return <Page></Page>;
}
