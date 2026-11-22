'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { ProductVariant } from '../../types/product';

interface ProductModalVariantListProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelect: (v: ProductVariant) => void;
}

export const ProductModalVariantList: React.FC<ProductModalVariantListProps> = ({
  variants,
  selectedVariant,
  onSelect,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold font-heading text-[#4A3A85]">Pilih Paket & Durasi</h4>
        <span className="text-[11px] text-[#7B6FA3] font-bold">
          {variants.length} pilihan
        </span>
      </div>

      <div className="space-y-2">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;

          return (
            <div
              key={variant.id}
              onClick={() => onSelect(variant)}
              className={`p-3.5 rounded-2xl border-[2px] cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#4A3A85] bg-[#FFF4CC] text-[#2F2552] shadow-xs'
                  : 'border-[#E7DFFB] bg-white hover:border-[#B7A3F2] text-[#2F2552]'
              }`}
            >
              <div className="flex items-center justify-between">
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
                  <div>
                    <span className="text-xs font-bold font-heading block">
                      {variant.name} ({variant.duration})
                    </span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-[#4A3A85] font-bold' : 'text-[#7B6FA3]'
                      }`}
                    >
                      {variant.type} • Garansi 30 Hari
                    </span>
                  </div>
                </div>

                <span className="text-xs font-extrabold font-heading text-[#4A3A85]">
                  Rp{variant.price.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
