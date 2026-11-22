'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface TierOption {
  label: string;
  price: number;
}

interface AboutTierItemProps {
  title: string;
  badge?: string;
  isSelected: boolean;
  options: TierOption[];
  activeDuration: string;
  onSelect: (option: TierOption) => void;
}

export const AboutTierItem: React.FC<AboutTierItemProps> = ({
  title,
  badge,
  isSelected,
  options,
  activeDuration,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(options[0])}
      className={`bg-white rounded-2xl p-4 border-[2px] transition-all cursor-pointer ${
        isSelected
          ? 'border-[#4A3A85] bg-[#FFF4CC] shadow-xs'
          : 'border-[#E7DFFB] hover:border-[#B7A3F2]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full border-[2px] flex items-center justify-center ${
              isSelected
                ? 'border-[#4A3A85] bg-[#4A3A85] text-white'
                : 'border-[#B7A3F2] bg-white'
            }`}
          >
            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
          </div>
          <span className="text-xs font-bold font-heading text-[#2F2552]">{title}</span>
        </div>
        {badge && (
          <span
            className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
              isSelected
                ? 'bg-[#FFE59A] text-[#2F2552] border border-[#FFE59A]'
                : 'bg-[#E4DCFB] text-[#4A3A85]'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Durasi Chips */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-[#E7DFFB]/60">
        {options.map((opt) => {
          const isCurrentActive = isSelected && activeDuration === opt.label;

          return (
            <button
              key={opt.label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(opt);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isCurrentActive
                  ? 'bg-[#4A3A85] text-[#F5F1FF] shadow-2xs'
                  : 'bg-white border border-[#E7DFFB] text-[#7B6FA3] hover:border-[#B7A3F2]'
              }`}
            >
              <span>{opt.label}</span>
              <span className="opacity-90">Rp{opt.price.toLocaleString('id-ID')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
