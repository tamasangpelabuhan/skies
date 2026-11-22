'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutGrid, CreditCard, Headphones, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutStore: React.FC = () => {
  const { settings } = useStore();

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl font-bold font-heading text-[#4A3A85] tracking-tight">
          Tentang toko
        </h2>
        <Link
          href="/tentang"
          className="text-xs font-bold text-[#7B6FA3] hover:text-[#4A3A85] transition-colors inline-flex items-center gap-1 group"
        >
          <span>Selengkapnya</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="bg-white rounded-[26px] md:rounded-[32px] p-5 md:p-6 lg:p-7 border-[1.5px] border-[#E7DFFB] shadow-2xs">
        <h3 className="text-sm md:text-base font-bold font-heading text-[#2F2552] tracking-tight mb-4 md:mb-6">
          {settings.tagline}
        </h3>

        {/* Responsive features: vertical on mobile, 3-column grid on md/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-3.5 p-3.5 md:p-4 rounded-2xl bg-[#F5F1FF] border border-[#E7DFFB] transition-all">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-[#FFF4CC] border border-[#FFE59A] flex items-center justify-center shrink-0 text-[#2F2552]">
              <LayoutGrid className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold font-heading text-[#2F2552]">Pilihan lengkap</h4>
              <p className="text-[11px] md:text-xs text-[#7B6FA3] font-semibold mt-0.5 leading-relaxed">
                Semua kategori aplikasi dalam satu toko.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3.5 p-3.5 md:p-4 rounded-2xl bg-[#F5F1FF] border border-[#E7DFFB] transition-all">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-[#FFF4CC] border border-[#FFE59A] flex items-center justify-center shrink-0 text-[#2F2552]">
              <CreditCard className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold font-heading text-[#2F2552]">Pembayaran mudah</h4>
              <p className="text-[11px] md:text-xs text-[#7B6FA3] font-semibold mt-0.5 leading-relaxed">
                Pilih QRIS atau transfer bank.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3.5 p-3.5 md:p-4 rounded-2xl bg-[#F5F1FF] border border-[#E7DFFB] transition-all">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-[#FFF4CC] border border-[#FFE59A] flex items-center justify-center shrink-0 text-[#2F2552]">
              <Headphones className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold font-heading text-[#2F2552]">Bantuan langsung</h4>
              <p className="text-[11px] md:text-xs text-[#7B6FA3] font-semibold mt-0.5 leading-relaxed">
                Admin siap membantu pesananmu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
