import Page from '@/views/launchpad/detail';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launchpad | OUTRN',
};

export default async function LaunchpadServerDetailPage({ params: { id } }: { params: { id: string } }) {
  console.log(id);

  return <Page></Page>;
}
