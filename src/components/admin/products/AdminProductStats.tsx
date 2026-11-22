'use client';

import React from 'react';
import { Package, Layers, Tag, CheckCircle2 } from 'lucide-react';
import { Card } from '../../ui/card';
import { Product } from '../../../types/product';
import { Category } from '../../../data/categories';

interface AdminProductStatsProps {
  products: Product[];
  categories: Category[];
}

export const AdminProductStats: React.FC<AdminProductStatsProps> = ({
  products,
  categories,
}) => {
  const totalVariants = products.reduce((sum, p) => sum + (p.variants?.length || 0), 0);
  const activeCategoriesCount = categories.filter((c) => c.id !== 'all').length;

  const lowestPrice = products.length > 0
    ? Math.min(...products.map((p) => p.price))
    : 0;

  const stats = [
    {
      title: 'Total Aplikasi',
      value: products.length.toString(),
      subtext: `${products.length} aplikasi siap tampil di toko`,
      icon: Package,
      badge: 'Aktif',
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    },
    {
      title: 'Total Varian Paket',
      value: totalVariants.toString(),
      subtext: lowestPrice > 0 ? `Mulai Rp${lowestPrice.toLocaleString('id-ID')}` : 'Belum ada varian',
      icon: Layers,
      badge: `${totalVariants} Tipe`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Kategori Produk',
      value: activeCategoriesCount.toString(),
      subtext: 'Kategori aktif terpasang',
      icon: Tag,
      badge: 'Tersinkron',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Status Katalog',
      value: 'Online',
      subtext: 'Terhubung langsung ke web pembeli',
      icon: CheckCircle2,
      badge: 'Live',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      isLive: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card
            key={idx}
            className="p-4 bg-white border border-zinc-200/80 rounded-2xl shadow-2xs hover:shadow-xs transition-all space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                {item.title}
              </span>
              <div className="w-8 h-8 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-center text-zinc-700">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                  {item.value}
                </span>
                {item.isLive ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-[10px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {item.badge}
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded-md border text-[10px] font-bold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                {item.subtext}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
