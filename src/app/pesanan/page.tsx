import type { Metadata } from 'next';
import { OrdersView } from '../../components/OrdersView';

export const metadata: Metadata = {
  title: 'Riwayat Pesanan & Garansi — Skies by Nas',
  description: 'Daftar riwayat pesanan dan status garansi akun digital kamu di Skies by Nas.',
};

export default function PesananPage() {
  return (
    <div className="animate-in fade-in duration-200">
      <OrdersView />
    </div>
  );
}
