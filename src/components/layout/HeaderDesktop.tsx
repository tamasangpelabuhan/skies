'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderDesktopActions } from './HeaderDesktopActions';

export const HeaderDesktop: React.FC = () => {
  const {
    cartCount,
    cartTotal,
    wishlist,
    orders,
    settings,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsNotificationsOpen,
  } = useStore();

  return (
    <div className="hidden md:flex items-center justify-between py-3.5">
      {/* Brand Logo & Name */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer group">
        <div className="w-10 h-10 rounded-2xl bg-[#4A3A85] flex items-center justify-center text-[#F5F1FF] font-black text-base shadow-xs border border-[#B7A3F2] group-hover:scale-105 transition-transform">
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
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-heading tracking-tight text-[#4A3A85]">
              {settings.name}
            </span>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF4CC] border border-[#FFE59A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ED6A5] animate-pulse" />
              <span className="text-[10px] font-extrabold text-[#2F2552]">
                {settings.status}
              </span>
            </div>
          </div>
          <span className="text-xs text-[#7B6FA3] font-semibold">
            Penyedia Akun Premium Resmi • since {settings.sinceYear}
          </span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <HeaderDesktopNav ordersCount={orders.length} />

      {/* Desktop Right Actions */}
      <HeaderDesktopActions
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
};
