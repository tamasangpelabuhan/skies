'use client';

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../ui/card';

export const AboutStoreCard: React.FC = () => {
  const { settings } = useStore();

  return (
    <Card className="p-5 space-y-3 border-[1.5px] border-[#E7DFFB]">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#4A3A85] flex items-center justify-center text-white shrink-0 shadow-xs border border-[#B7A3F2]">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-none stroke-white stroke-[2.5]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-bold font-heading text-[#4A3A85] leading-tight">
            {settings.name}
          </h2>
          <span className="text-[11px] font-bold text-[#7B6FA3]">
            since {settings.sinceYear}
          </span>
        </div>
      </div>

      <div className="space-y-1 pt-1">
        <h3 className="text-xs font-bold font-heading text-[#2F2552]">
          {settings.tagline}
        </h3>
        <p className="text-xs text-[#7B6FA3] leading-relaxed font-semibold">
          Berjualan sejak {settings.sinceYear}, {settings.name} menyediakan pilihan aplikasi untuk streaming, belajar, musik, dan kebutuhan digital lainnya dalam satu toko.
        </p>
      </div>
    </Card>
  );
};
