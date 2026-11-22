import type { Metadata } from 'next';
import { CheckoutView } from '../../components/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout Pembayaran — Skies by Nas',
  description: 'Selesaikan pemesanan akun aplikasi premium Anda dengan aman dan cepat.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
