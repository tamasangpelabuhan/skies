'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../../context/StoreContext';

export const FooterNav: React.FC = () => {
  const { setActiveTab } = useStore();

  const handleNav = (tab: 'beranda' | 'katalog' | 'pesanan' | 'bantuan') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-2.5">
      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
        Menu Navigasi
      </h4>
      <ul className="space-y-2 text-xs text-zinc-600">
        <li>
          <Link
            href="/"
            onClick={() => handleNav('beranda')}
            className="hover:text-zinc-950 transition-colors"
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            href="/katalog"
            onClick={() => handleNav('katalog')}
            className="hover:text-zinc-950 transition-colors"
          >
            Katalog Semua Aplikasi
          </Link>
        </li>
        <li>
          <Link
            href="/pesanan"
            onClick={() => handleNav('pesanan')}
            className="hover:text-zinc-950 transition-colors"
          >
            Cek Pesanan & Garansi
          </Link>
        </li>
        <li>
          <Link
            href="/bantuan"
            onClick={() => handleNav('bantuan')}
            className="hover:text-zinc-950 transition-colors"
          >
            Pusat Bantuan & FAQ
          </Link>
        </li>
      </ul>
    </div>
  );
};
