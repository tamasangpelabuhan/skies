import React from 'react';
import { Info } from 'lucide-react';

export const AboutPackageNotice: React.FC = () => {
  return (
    <div className="bg-[#FFF4CC] border border-[#FFE59A] rounded-2xl p-4 text-xs space-y-1">
      <div className="flex items-center gap-1.5 text-[#2F2552] font-bold">
        <Info className="w-4 h-4 text-[#4A3A85]" />
        <span className="font-heading">Sebelum membeli</span>
      </div>
      <p className="text-[11px] text-[#7B6FA3] leading-relaxed font-semibold">
        Pastikan tipe paket dan durasi sudah sesuai. Baca ketentuan pemakaian akun serta garansi toko sebelum melanjutkan.
      </p>
    </div>
  );
};
