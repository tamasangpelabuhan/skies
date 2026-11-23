'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Bell, MoreVertical, MessageCircle } from 'lucide-react';
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="md:hidden py-2.5">
      <div className="flex items-center justify-between gap-2">
        {/* Brand: Logo & Store Name (Single clean line, never wrapping) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 cursor-pointer group min-w-0 shrink"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-[#4A3A85] shrink-0 border border-[#B7A3F2] shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center">
            <img
              src="/images/icone.jpg"
              alt={settings.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg font-bold font-heading tracking-tight text-[#4A3A85] leading-none whitespace-nowrap">
              {settings.name}
            </span>
            <div className="flex items-center gap-1.5 mt-1 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
              <span className="text-[10px] font-bold text-[#7B6FA3] whitespace-nowrap">
                {settings.status} • since {settings.sinceYear}
              </span>
            </div>
          </div>
        </Link>

        {/* Right Actions: Wishlist, Cart & Feature Dropdown */}
        <div className="flex items-center gap-1 relative shrink-0">
          {/* Wishlist Button */}
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

          {/* Cart Button */}
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

          {/* Feature Dropdown Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Informasi & Fitur"
            className={`relative p-2 rounded-full active:scale-95 transition-all cursor-pointer ${
              isDropdownOpen
                ? 'bg-[#4A3A85] text-white'
                : 'text-[#7B6FA3] hover:text-[#4A3A85] hover:bg-[#E4DCFB]/50'
            }`}
          >
            <MoreVertical className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFE59A] ring-2 ring-[#F5F1FF]" />
          </button>

          {/* Dropdown Menu Popup */}
          {isDropdownOpen && (
            <>
              {/* Invisible Backdrop to close on tap outside */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Dropdown Card */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border-[1.5px] border-[#E7DFFB] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Store Status Banner */}
                <div className="p-2.5 rounded-xl bg-[#F5F1FF] border border-[#E7DFFB] mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-xs font-bold text-[#4A3A85]">
                      Toko Sedang {settings.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#7B6FA3] font-semibold mt-1 leading-snug">
                    Beli akun premium legal & cepat aktif (5–15 menit) bergaransi 30 hari.
                  </p>
                </div>

                {/* Dropdown Action Links */}
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsNotificationsOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-[#2F2552] hover:bg-[#F5F1FF] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-[#4A3A85]" />
                      <span>Notifikasi & Promo</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#F3B62E]" />
                  </button>

                  <a
                    href={`https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20${encodeURIComponent(settings.name)}%2C%20saya%20mau%20tanya%20produk`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-[#2F2552] hover:bg-[#F5F1FF] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Chat WhatsApp Admin</span>
                    </div>
                    <span className="text-[10px] text-[#7B6FA3] font-semibold">Online</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
