'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, ExternalLink } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';

export const AdminHeader: React.FC = () => {
  const pathname = usePathname();

  const getHeaderInfo = () => {
    if (pathname.startsWith('/admin/pesanan')) {
      return {
        section: 'Pesanan',
        title: 'Manajemen Pesanan',
        subtitle: 'Kelola transaksi masuk, ubah status, dan kirim kredensial akun.',
      };
    }
    if (pathname.startsWith('/admin/produk')) {
      return {
        section: 'Produk',
        title: 'Katalog Produk & Varian',
        subtitle: 'Daftar aplikasi premium dan harga paket aktif.',
      };
    }
    if (pathname.startsWith('/admin/pengaturan')) {
      return {
        section: 'Pengaturan',
        title: 'Pengaturan Toko',
        subtitle: 'Konfigurasi nomor WhatsApp admin dan jam operasional.',
      };
    }
    return {
      section: 'Dashboard',
      title: 'Ringkasan Toko',
      subtitle: 'Pantau metrik penjualan dan pesanan terbaru.',
    };
  };

  const current = getHeaderInfo();

  return (
    <header className="h-14 sm:h-16 shrink-0 border-b border-zinc-200/80 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 z-10">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Trigger (Desktop & Mobile) */}
        <SidebarTrigger />

        <div className="h-4 w-px bg-zinc-200" aria-hidden="true" />

        {/* Breadcrumb & Title */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
            <span>Admin</span>
            <span>/</span>
            <span className="text-zinc-900 font-semibold">{current.section}</span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-zinc-950 tracking-tight leading-tight">
            {current.title}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Live store indicator */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-semibold">
          <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
          <span className="hidden sm:inline">Toko Aktif</span>
          <span className="sm:hidden">Aktif</span>
        </div>

        {/* Quick link to view store */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 shadow-2xs transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Lihat Web Toko</span>
          <span className="sm:hidden">Web</span>
        </Link>
      </div>
    </header>
  );
};
