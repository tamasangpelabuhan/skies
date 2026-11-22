'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FooterGuarantees } from './layout/footer/FooterGuarantees';
import { FooterNav } from './layout/footer/FooterNav';

export const Footer: React.FC = () => {
  const { settings } = useStore();

  const handleContactCS = () => {
    const text = `Halo Admin *${settings.name}*! 👋\nSaya ingin bertanya seputar pemesanan aplikasi premium.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="mt-12 bg-white border-t border-[#E7DFFB] pt-10 pb-20 md:pb-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#E7DFFB]/60">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#4A3A85] shrink-0 border border-[#B7A3F2] flex items-center justify-center">
                <img
                  src="/images/icone.jpg"
                  alt={settings.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-bold font-heading text-[#4A3A85] tracking-tight">
                {settings.name}
              </span>
            </div>

            <p className="text-xs text-[#7B6FA3] font-semibold leading-relaxed">
              Penyedia langganan aplikasi premium terpercaya sejak {settings.sinceYear}. Proses cepat 5-15 menit dengan garansi penuh 30 hari.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF4CC] border border-[#FFE59A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ED6A5] animate-pulse" />
              <span className="text-[11px] font-bold text-[#2F2552]">
                Admin {settings.status}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <FooterNav />

          {/* Guarantees */}
          <FooterGuarantees />

          {/* Contact & Payment methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-[#4A3A85]">
              Metode Pembayaran
            </h4>
            <p className="text-[11px] text-[#7B6FA3] font-semibold">
              Menerima QRIS (semua e-wallet & mobile banking), Transfer Bank BCA, Mandiri, BRI, BNI.
            </p>

            <button
              onClick={handleContactCS}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#4A3A85] hover:bg-[#3d2f70] text-[#F5F1FF] text-xs font-bold active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#FFE59A] text-[#FFE59A]" />
              <span>WhatsApp Official</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B6FA3] font-semibold gap-2">
          <span>&copy; 2026 {settings.name}. All rights reserved.</span>
          <span>Dibuat untuk kemudahan langganan digital kamu</span>
        </div>
      </div>
    </footer>
  );
};
