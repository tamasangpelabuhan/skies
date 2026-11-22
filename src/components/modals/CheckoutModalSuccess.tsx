'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface CheckoutModalSuccessProps {
  invoiceNumber: string;
  onFinish: () => void;
}

export const CheckoutModalSuccess: React.FC<CheckoutModalSuccessProps> = ({
  invoiceNumber,
  onFinish,
}) => {
  return (
    <div className="p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#CDEFD9] text-[#1C6D41] border border-[#7ED6A5] flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div>
        <h4 className="text-lg font-bold font-heading text-[#4A3A85]">
          Pesan WhatsApp Telah Dibuat!
        </h4>
        <p className="text-xs text-[#7B6FA3] mt-1 max-w-xs mx-auto font-semibold">
          No. Invoice kamu: <strong className="text-[#2F2552]">#{invoiceNumber}</strong>. Chat WhatsApp admin telah terbuka otomatis.
        </p>
      </div>

      <div className="bg-[#F5F1FF] rounded-2xl p-4 text-left border border-[#E7DFFB] text-xs text-[#2F2552] space-y-2">
        <div className="flex items-center gap-2 font-bold font-heading text-[#4A3A85]">
          <ShieldCheck className="w-4 h-4 text-[#1C6D41]" />
          <span>Langkah Selanjutnya:</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#7B6FA3] font-semibold">
          <li>Kirim pesan WhatsApp yang sudah terisi otomatis ke admin.</li>
          <li>Admin akan mengirimkan QRIS / Nomor Rekening.</li>
          <li>Kirim bukti transfer, dan akun langsung dikirim 5-15 menit.</li>
        </ol>
      </div>

      <button
        onClick={onFinish}
        className="w-full py-3.5 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-white font-extrabold text-xs shadow-xs"
      >
        Lihat di Riwayat Pesanan
      </button>
    </div>
  );
};
