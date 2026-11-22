'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AppLogo } from './AppLogo';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    initiateCartCheckout,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2F2552]/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border-[1.5px] border-[#E7DFFB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-[#E7DFFB]/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4A3A85]" />
            <h3 className="text-base font-bold font-heading text-[#4A3A85]">
              Keranjang Belanja ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-[#F5F1FF] text-[#7B6FA3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FFF4CC] border border-[#FFE59A] text-[#4A3A85] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold font-heading text-[#2F2552]">Keranjang Masih Kosong</h4>
            <p className="text-xs text-[#7B6FA3] max-w-xs mx-auto font-semibold">
              Yuk pilih aplikasi premium favoritmu dan nikmati harga hemat!
            </p>
            <Link
              href="/katalog"
              onClick={() => setIsCartOpen(false)}
              className="mt-2 inline-block px-6 py-2.5 rounded-full bg-[#4A3A85] text-white font-extrabold text-xs hover:bg-[#3d2f70] active:scale-95 transition-all shadow-xs"
            >
              Jelajahi Katalog
            </Link>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* List */}
            <div className="p-5 overflow-y-auto space-y-3">
              {cart.map((item) => (
                <div
                  key={item.variant.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border-[1.5px] border-[#E7DFFB]"
                >
                  <AppLogo type={item.product.logoType} size="sm" className="shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold font-heading text-[#2F2552] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#7B6FA3] font-semibold truncate">
                      {item.variant.name} ({item.variant.duration})
                    </p>
                    <span className="text-xs font-extrabold font-heading text-[#4A3A85] block mt-0.5">
                      Rp{(item.variant.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.variant.id)}
                      className="text-[#7B6FA3] hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#F5F1FF] border border-[#E7DFFB] rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.variant.id, item.quantity - 1)}
                        className="w-5 h-5 rounded text-xs font-bold bg-white text-[#4A3A85] flex items-center justify-center hover:bg-[#FFF4CC]"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#2F2552]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.variant.id, item.quantity + 1)}
                        className="w-5 h-5 rounded text-xs font-bold bg-white text-[#4A3A85] flex items-center justify-center hover:bg-[#FFF4CC]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Checkout */}
            <div className="p-4 bg-white border-t border-[#E7DFFB]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-[#7B6FA3] font-semibold">Total Pembayaran:</span>
                <span className="text-base font-extrabold font-heading text-[#4A3A85]">
                  Rp{cartTotal.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                onClick={initiateCartCheckout}
                className="w-full py-3.5 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-white font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
              >
                <span>Checkout Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
