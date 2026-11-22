'use client';

import React from 'react';
import { AboutHeader } from './about/AboutHeader';
import { AboutStoreCard } from './about/AboutStoreCard';
import { AboutNetflixShowcase } from './about/AboutNetflixShowcase';
import { AboutPackageSelector } from './about/AboutPackageSelector';
import { AboutCategoriesCard } from './about/AboutCategoriesCard';
import { AboutTestimonialsCard } from './about/AboutTestimonialsCard';
import { AboutOperatingHours } from './about/AboutOperatingHours';
import { AboutContactsCard } from './about/AboutContactsCard';

export const AboutStoreView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F1FF] pb-24 space-y-6">
      {/* 1. Header with back button */}
      <AboutHeader />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* 2. Store Identity Card */}
        <AboutStoreCard />

        {/* 3. Netflix Showcase Card */}
        <AboutNetflixShowcase />

        {/* 4. Section: Tentang produk */}
        <div className="space-y-1.5">
          <h2 className="text-sm font-bold font-heading text-[#4A3A85] tracking-tight">
            Tentang produk
          </h2>
          <p className="text-xs text-[#7B6FA3] leading-relaxed font-semibold">
            Nikmati pilihan film, serial, dan dokumenter di Netflix. Tersedia empat tipe paket dengan pilihan durasi yang bisa kamu sesuaikan dengan kebutuhan.
          </p>
        </div>

        {/* 5. Section: Pilih paket */}
        <AboutPackageSelector />

        {/* 6. Section: Jual apa saja? */}
        <AboutCategoriesCard />

        {/* 7. Section: Kenapa belanja di sini? */}
        <AboutTestimonialsCard />

        {/* 8. Section: Jam operasional */}
        <AboutOperatingHours />

        {/* 9. Section: Temukan kami */}
        <AboutContactsCard />
      </div>
    </div>
  );
};
