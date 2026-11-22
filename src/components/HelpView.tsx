'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { HelpWhatsAppHero } from './help/HelpWhatsAppHero';
import { HelpQuickButtons } from './help/HelpQuickButtons';
import { HelpFaqAccordion } from './help/HelpFaqAccordion';
import { HelpOrderGuide } from './help/HelpOrderGuide';
import { HelpWarrantyCard } from './help/HelpWarrantyCard';
import { FAQS } from '../data/faqs';

export const HelpView: React.FC = () => {
  const { settings } = useStore();

  const handleContactAdmin = () => {
    const text = `Halo Admin *${settings.name}*! 👋\nSaya mau tanya seputar produk / cek pesanan saya.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleClaimWarranty = () => {
    const text = `Halo Admin *${settings.name}*! 👋\nSaya ingin mengajukan klaim bantuan garansi untuk akun saya:\n\n🧾 *No. Invoice:* \n📱 *Email / No. HP:* \n⚠️ *Kendala:* \n\nMohon bantuannya ya min. Terima kasih!`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-2 pb-24 space-y-6">
      {/* 1. Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-[#4A3A85] tracking-tight">
          Bantuan
        </h1>
        <p className="text-xs md:text-sm text-[#7B6FA3] font-semibold">
          Ada yang bisa kami bantu?
        </p>
      </div>

      {/* 2. Hero WhatsApp Banner */}
      <HelpWhatsAppHero onContactAdmin={handleContactAdmin} />

      {/* 3. Quick Navigation Buttons */}
      <HelpQuickButtons onScrollTo={scrollToSection} />

      {/* 4. FAQ Accordion Section */}
      <div id="faq-section" className="scroll-mt-20">
        <HelpFaqAccordion faqs={FAQS} />
      </div>

      {/* 5. How to Order Guide */}
      <div id="guide-section" className="scroll-mt-20">
        <HelpOrderGuide />
      </div>

      {/* 6. Warranty Terms Card */}
      <div id="warranty-section" className="scroll-mt-20">
        <HelpWarrantyCard onClaimWarranty={handleClaimWarranty} />
      </div>
    </div>
  );
};
