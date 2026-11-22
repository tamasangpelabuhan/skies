'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface CatalogSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export const CatalogSearchBar: React.FC<CatalogSearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B6FA3]" />
      <Input
        type="text"
        placeholder="Cari aplikasi favoritmu..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-11 pr-10 py-3 rounded-2xl border-[1.5px] border-[#E7DFFB] bg-white text-xs md:text-sm text-[#2F2552] placeholder:text-[#7B6FA3]/60 focus-visible:ring-[#4A3A85] shadow-2xs"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7B6FA3] hover:text-[#2F2552] p-1 cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
};
