import type { Metadata } from 'next';
import { HelpView } from '../../components/HelpView';

export const metadata: Metadata = {
  title: 'Pusat Bantuan & FAQ — Skies by Nas',
  description: 'Pertanyaan yang sering diajukan dan kontak customer service resmi Skies by Nas.',
};

export default function BantuanPage() {
  return (
    <div className="animate-in fade-in duration-200">
      <HelpView />
    </div>
  );
}
