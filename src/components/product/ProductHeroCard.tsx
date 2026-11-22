import React from 'react';
import { Star, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../../types/product';
import { Card } from '../ui/card';
import { AppLogo } from '../AppLogo';

interface ProductHeroCardProps {
  product: Product;
}

export const ProductHeroCard: React.FC<ProductHeroCardProps> = ({ product }) => {
  return (
    <div className="space-y-4">
      {/* Product Visual & Header Box */}
      <Card className="rounded-[26px] p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5 border-[1.5px] border-[#E7DFFB]">
        <AppLogo
          type={product.logoType}
          size="xl"
          className="w-24 h-24 md:w-28 md:h-28 rounded-3xl shrink-0 shadow-sm"
        />

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <span className="text-xs font-bold text-[#7B6FA3] block uppercase tracking-wider">
            {product.categoryLabel}
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-heading text-[#4A3A85] tracking-tight">
            {product.name}
          </h2>
          <p className="text-xs text-[#2F2552]/80 font-medium leading-relaxed max-w-md">
            {product.tagline}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1 font-bold text-[#F3B62E]">
              <Star className="w-4 h-4 fill-[#F3B62E] text-[#F3B62E]" />
              <span className="text-[#2F2552]">{product.rating.toFixed(1)}</span>
              <span className="text-[#7B6FA3] font-normal">({product.reviewCount} ulasan)</span>
            </div>
            <span className="text-[#E7DFFB]">•</span>
            <span className="text-[#1C6D41] font-bold">100% Legal & Bergaransi</span>
          </div>
        </div>
      </Card>

      {/* Guarantee Badges */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#CDEFD9]/60 text-[#1C6D41] border border-[#7ED6A5]/50">
          <ShieldCheck className="w-4 h-4 text-[#1C6D41] shrink-0" />
          <span className="font-extrabold text-xs">Garansi Penuh 30 Hari</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FFF4CC] text-[#2F2552] border border-[#FFE59A]">
          <Zap className="w-4 h-4 text-[#4A3A85] shrink-0" />
          <span className="font-extrabold text-xs">Proses Cepat 5-15 Menit</span>
        </div>
      </div>
    </div>
  );
};
