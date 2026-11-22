'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { Card } from '../ui/card';
import { AppLogo } from '../AppLogo';

export const AboutCategoriesCard: React.FC = () => {
  const { categories, products } = useStore();
  const subCategories = categories.filter((c) => c.id !== 'all');
  const sampleProducts = (products || []).slice(0, 3);

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold font-heading text-[#4A3A85] tracking-tight">
        Jual apa saja?
      </h2>

      <Card className="p-5 space-y-3.5 border-[1.5px] border-[#E7DFFB]">
        <h3 className="text-xs font-bold font-heading text-[#2F2552]">
          {subCategories.length > 0 ? `${subCategories.length} kategori aplikasi dalam toko.` : 'Kategori produk aplikasi digital.'}
        </h3>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {subCategories.length === 0 ? (
            <span className="text-xs text-[#7B6FA3]">Kategori produk akan ditampilkan di sini.</span>
          ) : (
            subCategories.map((cat) => (
              <span
                key={cat.id}
                className="shrink-0 px-3 py-1 font-bold text-xs rounded-full bg-[#FFF4CC] border border-[#FFE59A] text-[#2F2552]"
              >
                {cat.label}
              </span>
            ))
          )}
        </div>

        {sampleProducts.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-[#E7DFFB]/60">
            {sampleProducts.map((item) => (
              <Link
                key={item.id}
                href={`/produk/${item.slug}`}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F1FF] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <AppLogo
                    type={item.logoType}
                    size="sm"
                    className="w-8 h-8 rounded-lg shrink-0"
                  />
                  <div>
                    <span className="text-xs font-bold font-heading text-[#2F2552] group-hover:text-[#4A3A85] block">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#7B6FA3] block">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#4A3A85]">
                  Mulai Rp{item.price.toLocaleString('id-ID')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
