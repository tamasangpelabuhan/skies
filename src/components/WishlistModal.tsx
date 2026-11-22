'use client';

import React from 'react';
import { X, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AppLogo } from './AppLogo';

export const WishlistModal: React.FC = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, setSelectedProduct, products } = useStore();

  if (!isWishlistOpen) return null;

  const currentProducts = products || [];
  const wishlistedProducts = currentProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2F2552]/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border-[1.5px] border-[#E7DFFB]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 pb-3 flex items-center justify-between border-b border-[#E7DFFB]/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="text-base font-bold font-heading text-[#4A3A85]">
              Favorit Saya ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full hover:bg-[#F5F1FF] text-[#7B6FA3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FFF4CC] border border-[#FFE59A] text-red-400 flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold font-heading text-[#2F2552]">Belum Ada Favorit</h4>
            <p className="text-xs text-[#7B6FA3] max-w-xs mx-auto font-semibold">
              Klik ikon hati pada produk yang ingin kamu simpan untuk dibeli nanti.
            </p>
          </div>
        ) : (
          <div className="p-5 overflow-y-auto space-y-3">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsWishlistOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border-[1.5px] border-[#E7DFFB] hover:border-[#B7A3F2] cursor-pointer transition-all"
              >
                <AppLogo type={product.logoType} size="sm" className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold font-heading text-[#2F2552] truncate">
                    {product.name}
                  </h4>
                  <span className="text-[10px] text-[#7B6FA3] font-semibold block">
                    {product.categoryLabel}
                  </span>
                  <span className="text-xs font-extrabold text-[#4A3A85] block mt-0.5">
                    Mulai Rp{product.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
