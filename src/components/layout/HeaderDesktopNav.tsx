'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ReceiptText, Headphones, Info } from 'lucide-react';

interface HeaderDesktopNavProps {
  ordersCount: number;
}

export const HeaderDesktopNav: React.FC<HeaderDesktopNavProps> = ({ ordersCount }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Beranda', icon: Home, isActive: pathname === '/' },
    { href: '/katalog', label: 'Katalog', icon: LayoutGrid, isActive: pathname === '/katalog' },
    { href: '/pesanan', label: 'Cek Pesanan', icon: ReceiptText, isActive: pathname === '/pesanan', count: ordersCount },
    { href: '/bantuan', label: 'Bantuan & FAQ', icon: Headphones, isActive: pathname === '/bantuan' },
    { href: '/tentang', label: 'Tentang', icon: Info, isActive: pathname === '/tentang' },
  ];

  return (
    <nav className="flex items-center gap-1 bg-white p-1 rounded-2xl border-[1.5px] border-[#E7DFFB] shadow-2xs">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
              item.isActive
                ? 'bg-[#4A3A85] text-[#F5F1FF] shadow-xs'
                : 'text-[#7B6FA3] hover:text-[#4A3A85] hover:bg-[#F5F1FF]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
            {item.count !== undefined && item.count > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FFE59A] text-[#2F2552] text-[9px] font-extrabold flex items-center justify-center">
                {item.count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
