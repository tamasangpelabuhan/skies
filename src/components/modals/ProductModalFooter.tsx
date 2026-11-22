'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductModalFooterProps {
  totalPrice: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const ProductModalFooter: React.FC<ProductModalFooterProps> = ({
  totalPrice,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div className="p-4 bg-white border-t border-[#E7DFFB] flex items-center gap-3">
      <div className="shrink-0">
        <span className="text-[10px] text-[#7B6FA3] block font-semibold">Total Harga</span>
        <span className="text-base font-extrabold font-heading text-[#4A3A85]">
          Rp{totalPrice.toLocaleString('id-ID')}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-1">
        <button
          onClick={onAddToCart}
          className="flex-1 py-3 px-3 rounded-full border-[1.5px] border-[#E7DFFB] hover:bg-[#F5F1FF] text-[#4A3A85] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Keranjang</span>
        </button>
        <button
          onClick={onBuyNow}
          className="flex-1 py-3 px-3 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-[#F5F1FF] font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <span>Beli Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
