'use client';

import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { ProductVariant } from '../../types/product';

interface ProductStickyBarProps {
  selectedVariant: ProductVariant;
  totalPrice: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const ProductStickyBar: React.FC<ProductStickyBarProps> = ({
  selectedVariant,
  totalPrice,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E7DFFB] shadow-xl pb-3 pt-3">
      <div className="max-w-2xl mx-auto px-4 space-y-2.5">
        {/* Price & Selection summary row */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#7B6FA3] block font-semibold">
              Paket pilihan
            </span>
            <span className="text-xs md:text-sm font-bold font-heading text-[#2F2552] block">
              {selectedVariant.name}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#7B6FA3] block font-semibold">
              Total harga
            </span>
            <span className="text-lg md:text-xl font-extrabold font-heading text-[#4A3A85] block leading-tight">
              Rp{totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Buttons Row: Cart Icon button + Beli Sekarang button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onAddToCart}
            aria-label="Tambah ke keranjang"
            className="w-12 h-12 rounded-full border-[1.5px] border-[#E7DFFB] hover:bg-[#F5F1FF] flex items-center justify-center text-[#4A3A85] active:scale-95 transition-all shrink-0 cursor-pointer shadow-2xs"
          >
            <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button
            onClick={onBuyNow}
            className="flex-1 py-3.5 px-5 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-[#F5F1FF] font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md group cursor-pointer"
          >
            <span>Beli sekarang</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* iPhone Home indicator bar */}
        <div className="w-32 h-1 bg-[#4A3A85]/20 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );
};
