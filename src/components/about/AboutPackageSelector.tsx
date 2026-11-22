'use client';

import React, { useState } from 'react';
import { AboutTierItem, TierOption } from './AboutTierItem';
import { AboutPackageNotice } from './AboutPackageNotice';

interface TierConfig {
  id: string;
  title: string;
  badge?: string;
  options: TierOption[];
}

const PACKAGE_TIERS: TierConfig[] = [
  {
    id: '1p2u',
    title: '1P2U',
    badge: 'Dipilih',
    options: [{ label: '1 Bulan', price: 30000 }],
  },
  {
    id: '1p1u',
    title: '1P1U',
    badge: '2 durasi',
    options: [
      { label: '7 Hari', price: 5000 },
      { label: '1 Bulan', price: 40000 },
    ],
  },
  {
    id: 'semi-private',
    title: 'Semi Private',
    options: [{ label: '1 Bulan', price: 50000 }],
  },
  {
    id: 'private',
    title: 'Private',
    options: [{ label: '1 Hari', price: 100000 }],
  },
];

export const AboutPackageSelector: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>('1p2u');
  const [activeDuration, setActiveDuration] = useState<string>('1 Bulan');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-zinc-950 tracking-tight">
          Pilih paket
        </h2>
        <span className="text-xs text-zinc-400 font-medium">4 tipe paket</span>
      </div>
      <p className="text-[11px] text-zinc-400 -mt-1">
        Pilih tipe akun, lalu tentukan durasinya.
      </p>

      <div className="space-y-3">
        {PACKAGE_TIERS.map((tier) => (
          <AboutTierItem
            key={tier.id}
            title={tier.title}
            badge={tier.badge}
            isSelected={selectedTierId === tier.id}
            options={tier.options}
            activeDuration={activeDuration}
            onSelect={(opt) => {
              setSelectedTierId(tier.id);
              setActiveDuration(opt.label);
            }}
          />
        ))}

        <AboutPackageNotice />
      </div>
    </div>
  );
};
