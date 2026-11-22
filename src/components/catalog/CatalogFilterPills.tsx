'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { CategoryId } from '../../types/product';
import { useStore } from '../../context/StoreContext';

interface CatalogFilterPillsProps {
  activeFilter: 'all' | 'favorites' | CategoryId;
  onSelect: (filter: 'all' | 'favorites' | CategoryId) => void;
  favoritesCount: number;
}

export const CatalogFilterPills: React.FC<CatalogFilterPillsProps> = ({
  activeFilter,
  onSelect,
  favoritesCount,
}) => {
  const { categories } = useStore();
  const subCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div className="space-y-2.5">
      {/* Row 1: Semua produk & Favorit */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSelect('all')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#4A3A85] text-[#F5F1FF] border-[1.5px] border-[#4A3A85] shadow-xs'
              : 'bg-white text-[#7B6FA3] border-[1.5px] border-[#E7DFFB] hover:text-[#4A3A85] hover:border-[#B7A3F2]'
          }`}
        >
          Semua produk
        </button>

        <button
          onClick={() => onSelect(activeFilter === 'favorites' ? 'all' : 'favorites')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
            activeFilter === 'favorites'
              ? 'bg-red-500 text-white shadow-xs border-[1.5px] border-red-500'
              : 'bg-white text-[#2F2552] border-[1.5px] border-[#E7DFFB] hover:border-[#B7A3F2]'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              activeFilter === 'favorites' ? 'fill-white text-white' : 'fill-red-500 text-red-500'
            }`}
          />
          <span>Favorit • {favoritesCount}</span>
        </button>
      </div>

      {/* Row 2: Sub-categories dynamic */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {subCategories.map((cat) => {
          const isActive = activeFilter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(isActive ? 'all' : cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FFE59A] text-[#2F2552] border-[1.5px] border-[#FFE59A] shadow-xs'
                  : 'bg-white text-[#7B6FA3] border-[1.5px] border-[#E7DFFB] hover:text-[#4A3A85] hover:border-[#B7A3F2]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
