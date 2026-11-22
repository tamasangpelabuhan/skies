'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { ProductVariant } from '../../types/product';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold font-heading text-[#4A3A85]">
          Pilih Paket & Durasi
        </h3>
        <span className="text-xs text-[#7B6FA3] font-bold">
          {variants.length} pilihan paket
        </span>
      </div>

      <div className="space-y-2.5">
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;

          return (
            <div
              key={variant.id}
              onClick={() => onSelect(variant)}
              className={`p-4 rounded-2xl border-[2px] cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#4A3A85] bg-[#FFF4CC] text-[#2F2552] shadow-xs'
                  : 'border-[#E7DFFB] bg-white hover:border-[#B7A3F2] text-[#2F2552]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'border-[#4A3A85] bg-[#4A3A85] text-white shadow-inner'
                        : 'border-[#B7A3F2] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-bold font-heading block">
                        {variant.name}
                      </span>
                      {variant.isBestSeller && (
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-[#FFE59A] text-[#2F2552] border border-[#FFE59A]' : 'bg-[#FFF4CC] text-[#4A3A85] border border-[#FFE59A]'
                          }`}
                        >
                          Terlaris
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[11px] block mt-0.5 font-semibold ${
                        isSelected ? 'text-[#4A3A85]' : 'text-[#7B6FA3]'
                      }`}
                    >
                      Tipe: {variant.type}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm md:text-base font-extrabold font-heading text-[#4A3A85] block">
                    Rp{variant.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-[#7B6FA3] font-bold block">
                    {variant.duration}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
