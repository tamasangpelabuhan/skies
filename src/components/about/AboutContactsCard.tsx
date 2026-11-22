'use client';

import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../ui/card';

export const AboutContactsCard: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="space-y-3 pb-6">
      <h2 className="text-base font-bold font-heading text-[#4A3A85] tracking-tight">
        Temukan kami
      </h2>

      <Card className="p-4 divide-y divide-[#E7DFFB]/60 border-[1.5px] border-[#E7DFFB]">
        <div className="flex items-center gap-3.5 py-3">
          <div className="w-9 h-9 rounded-xl bg-[#F5F1FF] border border-[#E7DFFB] flex items-center justify-center text-[#4A3A85] shrink-0">
            <Mail className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <span className="text-xs font-bold font-heading text-[#2F2552] block">Email</span>
            <span className="text-[11px] text-[#7B6FA3] block">Belum ditambahkan</span>
          </div>
        </div>

        <div
          onClick={() => {
            window.open(`https://wa.me/${settings.whatsappNumber}`, '_blank');
          }}
          className="flex items-center gap-3.5 py-3 cursor-pointer hover:bg-[#F5F1FF] rounded-xl transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#CDEFD9] text-[#1C6D41] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <span className="text-xs font-bold font-heading text-[#2F2552] block">WhatsApp</span>
            <span className="text-[11px] text-[#1C6D41] font-bold block">
              {settings.whatsappDisplay}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 py-3">
          <div className="w-9 h-9 rounded-xl bg-[#F5F1FF] border border-[#E7DFFB] flex items-center justify-center text-[#4A3A85] font-black text-xs shrink-0 font-heading">
            X
          </div>
          <div>
            <span className="text-xs font-bold font-heading text-[#2F2552] block">X</span>
            <span className="text-[11px] text-[#7B6FA3] block">@skiesbyna</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
