'use client';

import React from 'react';
import Link from 'next/link';
import { PackageOpen, ArrowRight } from 'lucide-react';

export const CatalogEmptyState: React.FC = () => {
  return (
    <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200/80 shadow-xs space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
        <PackageOpen className="w-6 h-6" />
      </div>
      <p className="text-sm font-bold text-zinc-800">Katalog Masih Kosong</p>
      <p className="text-xs text-zinc-400 max-w-sm mx-auto">
        Belum ada produk yang ditambahkan ke toko. Tambahkan produk melalui dashboard admin.
      </p>
      <div className="pt-2">
        <Link
          href="/admin/produk"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs font-bold hover:bg-zinc-800 transition-all cursor-pointer"
        >
          <span>Buka Admin Produk</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
