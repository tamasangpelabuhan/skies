'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ReceiptText, Headphones } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { orders } = useStore();

  const navItems = [
    {
      id: 'beranda',
      href: '/',
      label: 'Beranda',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      id: 'katalog',
      href: '/katalog',
      label: 'Katalog',
      icon: LayoutGrid,
      isActive: pathname === '/katalog',
    },
    {
      id: 'pesanan',
      href: '/pesanan',
      label: 'Pesanan',
      icon: ReceiptText,
      badge: orders.length > 0 ? orders.length : undefined,
      isActive: pathname === '/pesanan',
    },
    {
      id: 'bantuan',
      href: '/bantuan',
      label: 'Bantuan',
      icon: Headphones,
      isActive: pathname === '/bantuan',
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E7DFFB] shadow-lg pb-1 pt-1.5 transition-all">
      <div className="max-w-md mx-auto px-4">
        <nav className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                  item.isActive
                    ? 'text-[#2F2552] font-black'
                    : 'text-[#7B6FA3] font-bold hover:text-[#4A3A85]'
                }`}
              >
                {/* Active Pill highlight with Butter Yellow #FFE59A */}
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    item.isActive ? 'bg-[#FFE59A] text-[#2F2552]' : 'text-[#7B6FA3]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.3]" />
                </div>

                <span className="text-[10.5px] tracking-tight mt-0.5 font-bold">
                  {item.label}
                </span>

                {/* Badge if any */}
                {item.badge && (
                  <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#4A3A85] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* iPhone Style Home Indicator bar */}
        <div className="w-32 h-1 bg-[#4A3A85]/20 rounded-full mx-auto mt-2 mb-1" />
      </div>
    </div>
  );
};
