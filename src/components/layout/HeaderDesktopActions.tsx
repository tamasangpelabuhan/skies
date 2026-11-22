'use client';

import React from 'react';
import { Heart, ShoppingCart, Bell, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface HeaderDesktopActionsProps {
  wishlistCount: number;
  cartCount: number;
  cartTotal: number;
  onOpenWishlist: () => void;
  onOpenNotifications: () => void;
  onOpenCart: () => void;
}

export const HeaderDesktopActions: React.FC<HeaderDesktopActionsProps> = ({
  wishlistCount,
  cartCount,
  cartTotal,
  onOpenWishlist,
  onOpenNotifications,
  onOpenCart,
}) => {
  const { settings } = useStore();

  const handleContactCS = () => {
    const text = `Halo Admin *${settings.name}*! 👋\nSaya ingin bertanya seputar pemesanan aplikasi premium.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center gap-2.5">
      <button
        onClick={onOpenWishlist}
        className="p-2.5 rounded-xl bg-white border-[1.5px] border-[#E7DFFB] hover:bg-[#F5F1FF] text-[#7B6FA3] hover:text-red-500 transition-all relative cursor-pointer"
        title="Favorit"
      >
        <Heart className="w-4 h-4" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      <button
        onClick={onOpenNotifications}
        className="p-2.5 rounded-xl bg-white border-[1.5px] border-[#E7DFFB] hover:bg-[#F5F1FF] text-[#7B6FA3] hover:text-[#4A3A85] transition-all relative cursor-pointer"
        title="Notifikasi"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFE59A] ring-2 ring-white" />
      </button>

      <button
        onClick={onOpenCart}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border-[1.5px] border-[#E7DFFB] hover:bg-[#F5F1FF] text-[#2F2552] transition-all cursor-pointer"
      >
        <div className="relative">
          <ShoppingCart className="w-4 h-4 text-[#4A3A85]" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#4A3A85] text-white text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-[#4A3A85]">
          {cartTotal > 0 ? `Rp${cartTotal.toLocaleString('id-ID')}` : 'Keranjang'}
        </span>
      </button>

      <button
        onClick={handleContactCS}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4A3A85] hover:bg-[#3d2f70] text-[#F5F1FF] text-xs font-bold active:scale-95 transition-all shadow-xs cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 fill-[#FFE59A] text-[#FFE59A]" />
        <span>Chat Admin WA</span>
      </button>
    </div>
  );
};
