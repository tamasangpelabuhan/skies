'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';

interface CheckoutSuccessViewProps {
  invoiceNumber: string;
}

export const CheckoutSuccessView: React.FC<CheckoutSuccessViewProps> = ({ invoiceNumber }) => {
  const router = useRouter();

  return (
    <Card className="p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-zinc-950">
          Pesanan Berhasil Dibuat!
        </h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
          No. Invoice: <strong className="text-zinc-900">#{invoiceNumber}</strong>. Chat WhatsApp admin telah dibuka.
        </p>
      </div>

      <div className="bg-zinc-50 rounded-2xl p-4 text-left border border-zinc-100 text-xs text-zinc-600 space-y-2">
        <span className="font-bold text-zinc-900 block">Langkah Pembayaran:</span>
        <ol className="list-decimal list-inside space-y-1 text-[11px] text-zinc-500">
          <li>Kirim pesan WhatsApp yang sudah terisi otomatis ke admin.</li>
          <li>Admin akan mengirimkan QRIS / Nomor Rekening resmi.</li>
          <li>Kirim bukti transfer, dan akun langsung dikirim 5-15 menit.</li>
        </ol>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => router.push('/pesanan')}
          className="flex-1 py-3 rounded-2xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Cek di Menu Pesanan
        </button>
      </div>
    </Card>
  );
};
