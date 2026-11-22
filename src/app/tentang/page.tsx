import type { Metadata } from 'next';
import { AboutStoreView } from '../../components/AboutStoreView';

export const metadata: Metadata = {
  title: 'Tentang Toko — Skies by Nas',
  description: 'Kenali Skies by Nas: Penyedia akun premium resmi sejak 2022 untuk streaming, edukasi, musik, dan kebutuhan digital lainnya.',
};

export default function TentangPage() {
  return (
    <div className="animate-in fade-in duration-200">
      <AboutStoreView />
    </div>
  );
}
