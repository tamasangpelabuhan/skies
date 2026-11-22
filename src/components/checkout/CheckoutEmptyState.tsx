'use client';

import React from 'react';
import Link from 'next/link';
import { PackageOpen, ArrowRight } from 'lucide-react';
import { CheckoutHeader } from './CheckoutHeader';

export const CheckoutEmptyState: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-36">
      <CheckoutHeader />
      <div className="max-w-md mx-auto pt-16 px-4 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <PackageOpen className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-zinc-900">Tidak Ada Item Checkout</h2>
        <p className="text-xs text-zinc-500">
          Silakan pilih produk terlebih dahulu melalui katalog sebelum melakukan checkout.
        </p>
        <div className="pt-2">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold hover:bg-zinc-800 transition-all"
          >
            <span>Buka Katalog Produk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
