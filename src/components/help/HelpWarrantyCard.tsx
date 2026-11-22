'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Card } from '../ui/card';

interface HelpWarrantyCardProps {
  onClaimWarranty: () => void;
}

export const HelpWarrantyCard: React.FC<HelpWarrantyCardProps> = ({ onClaimWarranty }) => {
  return (
    <div id="garansi-section" className="space-y-3">
      <h2 className="text-base md:text-lg font-bold text-zinc-950 tracking-tight">
        Garansi & kendala akun
      </h2>

      <Card className="rounded-[26px] md:rounded-[32px] p-5 space-y-3">
        <div className="flex items-center gap-2 text-zinc-900">
          <ShieldCheck className="w-5 h-5 text-zinc-800 shrink-0 stroke-[2]" />
          <h3 className="text-xs md:text-sm font-bold">
            Baca ketentuan sebelum membeli
          </h3>
        </div>

        <p className="text-[11px] md:text-xs text-zinc-500 leading-relaxed">
          Masa dan cakupan garansi mengikuti keterangan setiap produk. Jika ada kendala, siapkan nomor pesanan, bukti pembayaran, dan tangkapan layar.
        </p>

        <button
          onClick={onClaimWarranty}
          className="w-full py-3 rounded-2xl bg-[#f4f4f5] hover:bg-zinc-200 text-zinc-900 font-bold text-xs active:scale-98 transition-all cursor-pointer"
        >
          Ajukan bantuan garansi
        </button>
      </Card>
    </div>
  );
};
