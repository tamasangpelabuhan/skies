'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { Card } from '../ui/card';

interface OrderHelpCardProps {
  onContactAdmin: () => void;
}

export const OrderHelpCard: React.FC<OrderHelpCardProps> = ({ onContactAdmin }) => {
  return (
    <Card className="p-5 space-y-3 border-[1.5px] border-[#E7DFFB]">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-[#4A3A85] shrink-0" />
        <h3 className="text-xs md:text-sm font-bold font-heading text-[#2F2552]">
          Pesanan belum muncul?
        </h3>
      </div>

      <p className="text-[11px] md:text-xs text-[#7B6FA3] font-semibold leading-relaxed">
        Pastikan email dan nomor pesanan sudah benar. Simpan bukti pembayaran untuk menghubungi admin.
      </p>

      <button
        onClick={onContactAdmin}
        className="w-full py-3 rounded-full bg-[#FFF4CC] border border-[#FFE59A] hover:bg-[#ffe082] text-[#2F2552] font-extrabold text-xs active:scale-98 transition-all cursor-pointer shadow-2xs"
      >
        Hubungi admin
      </button>
    </Card>
  );
};
