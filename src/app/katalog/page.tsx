import type { Metadata } from 'next';
import { CatalogView } from '../../components/CatalogView';

export const metadata: Metadata = {
  title: 'Katalog Aplikasi Premium — Skies by Nas',
  description: 'Temukan aplikasi yang kamu suka: streaming, education, musik, dan tools kreatif harga terjangkau bergaransi di Skies by Nas.',
};

export default function KatalogPage() {
  return (
    <div className="animate-in fade-in duration-200">
      <CatalogView />
    </div>
  );
}
