import React from 'react';
import Link from 'next/link';
import { Product, ProductVariant } from '../../types/product';
import { Card } from '../ui/card';
import { AppLogo } from '../AppLogo';

interface CheckoutSummaryProps {
  product: Product;
  variant: ProductVariant;
  totalPrice: number;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  product,
  variant,
  totalPrice,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold font-heading text-[#4A3A85] tracking-tight">
          Pesanan kamu
        </h2>
        <Link
          href={`/produk/${product.slug}`}
          className="text-xs font-bold text-[#7B6FA3] hover:text-[#4A3A85] transition-colors cursor-pointer"
        >
          Ubah paket
        </Link>
      </div>

      <Card className="p-4 flex items-center gap-3.5 border-[1.5px] border-[#E7DFFB]">
        <AppLogo
          type={product.logoType}
          size="sm"
          className="w-14 h-14 rounded-2xl shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold font-heading text-[#2F2552] truncate">
            {product.name}
          </h3>
          <span className="text-xs text-[#7B6FA3] font-semibold block mt-0.5 truncate">
            {variant.name}
          </span>
          <span className="text-xs md:text-sm font-extrabold font-heading text-[#4A3A85] block mt-1">
            Rp{totalPrice.toLocaleString('id-ID')}
          </span>
        </div>
      </Card>
    </div>
  );
};
