import { notFound } from 'next/navigation';
import MerchDetailsPage from '@/Modules/MerchModules/MerchDetailsModule';
import { merchs } from '@/Modules/MerchModules/data/const';
import { MerchEntry } from '@/Modules/MerchModules/data/types';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function MerchDetails({ params }: PageProps) {
  const { id } = await params; // ✅ must `await` params if used inside an async component (even if it's a simple access)

  const merch: MerchEntry | undefined = merchs.find((e) => e.id === id);

  if (!merch) {
    notFound(); // this correctly triggers Next.js 404 page
  }

  return <MerchDetailsPage data={merch} />;
}
