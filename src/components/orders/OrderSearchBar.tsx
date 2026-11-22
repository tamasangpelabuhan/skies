'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface OrderSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export const OrderSearchBar: React.FC<OrderSearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-1.5">
      <div className="relative flex items-center">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B6FA3]" />
        <Input
          type="text"
          placeholder="Nomor pesanan atau email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-11 pr-16 py-3 rounded-2xl border-[1.5px] border-[#E7DFFB] bg-white text-xs md:text-sm text-[#2F2552] placeholder:text-[#7B6FA3]/60 focus-visible:ring-[#4A3A85] shadow-2xs"
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#4A3A85] hover:text-[#2F2552] cursor-pointer"
        >
          Cek
        </button>
      </div>
      <p className="text-[11px] text-[#7B6FA3] font-semibold px-1">
        Gunakan email yang kamu pakai saat checkout.
      </p>
    </div>
  );
};
