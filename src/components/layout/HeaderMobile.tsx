'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Bell } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeaderMobile: React.FC = () => {
  const {
    cartCount,
    wishlist,
    settings,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsNotificationsOpen,
  } = useStore();

  return (
    <div className="md:hidden pt-2 pb-2.5">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#4A3A85] flex items-center justify-center text-[#F5F1FF] font-black text-sm shadow-xs border border-[#B7A3F2] group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-none stroke-white stroke-[2.5]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold font-heading tracking-tight text-[#4A3A85] block leading-tight">
              {settings.name}
            </span>
            <span className="text-[10px] font-bold text-[#7B6FA3]">
              since {settings.sinceYear}
            </span>
          </div>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF4CC] border border-[#FFE59A] mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7ED6A5] animate-pulse" />
            <span className="text-[10px] font-extrabold text-[#2F2552]">
              {settings.status}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Favorit"
            className="relative p-2 text-[#7B6FA3] hover:text-[#4A3A85] rounded-full hover:bg-[#E4DCFB]/50 active:scale-95 transition-all cursor-pointer"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#F5F1FF]" />
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Keranjang"
            className="relative p-2 text-[#7B6FA3] hover:text-[#4A3A85] rounded-full hover:bg-[#E4DCFB]/50 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#4A3A85] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#F5F1FF]">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="Notifikasi"
            className="relative p-2 text-[#7B6FA3] hover:text-[#4A3A85] rounded-full hover:bg-[#E4DCFB]/50 active:scale-95 transition-all cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFE59A] ring-2 ring-[#F5F1FF]" />
          </button>
        </div>
      </div>
    </div>
  );
};
