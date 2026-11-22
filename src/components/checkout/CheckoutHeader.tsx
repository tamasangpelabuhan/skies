'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CheckoutHeader: React.FC = () => {
  const router = useRouter();
  const {
    cartCount,
    setIsCartOpen,
    setIsWishlistOpen,
  } = useStore();

  return (
    <div className="sticky top-0 z-30 bg-[#F5F1FF]/95 backdrop-blur-md border-b border-[#E7DFFB] py-3 transition-all">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4 sm:px-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            aria-label="Kembali"
            className="p-1.5 rounded-full hover:bg-[#E4DCFB]/60 active:scale-95 transition-all text-[#4A3A85] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-base md:text-lg font-bold font-heading text-[#4A3A85] tracking-tight">
            Checkout
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Favorit"
            className="p-2 text-[#7B6FA3] hover:text-[#4A3A85] rounded-full hover:bg-[#E4DCFB]/50 active:scale-95 transition-all cursor-pointer"
          >
            <Heart className="w-5 h-5" />
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
        </div>
      </div>
    </div>
  );
};
