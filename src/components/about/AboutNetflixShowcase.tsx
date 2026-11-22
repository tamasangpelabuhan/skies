'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AppLogo } from '../AppLogo';

export const AboutNetflixShowcase: React.FC = () => {
  const { toggleWishlist, isWishlisted } = useStore();
  const netflixFavorited = isWishlisted('netflix');

  return (
    <div className="space-y-2">
      <Link href="/produk/netflix" className="block group">
        <div className="bg-[#18181b] text-white rounded-[26px] p-5 shadow-lg flex items-center gap-4 hover:bg-zinc-900 transition-colors">
          <AppLogo
            type="netflix"
            size="md"
            className="w-16 h-16 rounded-2xl shrink-0 shadow-inner group-hover:scale-105 transition-transform"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 block">
              APP STREAMING
            </span>
            <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
              Netflix
            </h3>
            <p className="text-[11px] text-zinc-400 leading-snug mt-1">
              Film, serial, dan dokumenter favorit dalam satu aplikasi.
            </p>
          </div>
        </div>
      </Link>

      {/* Price row below banner */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-zinc-700">
          Mulai <strong className="text-zinc-950 font-extrabold">Rp6.000</strong>
        </span>

        <button
          onClick={() => toggleWishlist('netflix')}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-500 hover:text-red-600 active:scale-95 transition-all cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              netflixFavorited ? 'fill-red-500 text-red-500' : 'text-red-500'
            }`}
          />
          <span>Disimpan di favorit</span>
        </button>
      </div>
    </div>
  );
};
