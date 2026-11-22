'use client';

import React from 'react';
import { Product } from '../../../types/product';
import { AppLogo } from '../../AppLogo';
import { Star, CheckCircle2, Pencil, Trash2, ShieldCheck } from 'lucide-react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all flex flex-col justify-between gap-4">
      <div className="space-y-3.5">
        {/* Header: Logo, Name, Category, Rating & Action Menu */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <AppLogo
              type={product.logoType}
              size="sm"
              className="w-11 h-11 rounded-xl shrink-0 border border-zinc-100 shadow-2xs"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-semibold text-zinc-600">
                  {product.categoryLabel}
                </Badge>
                <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-zinc-950 truncate mt-1">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(product)}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200/60 transition-colors cursor-pointer"
              title="Edit Produk & Varian"
              aria-label="Edit Produk"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200/60 transition-colors cursor-pointer"
              title="Hapus Produk"
              aria-label="Hapus Produk"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Variants list preview */}
        <div className="space-y-1.5 pt-2 border-t border-zinc-100">
          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500">
            <span>Daftar Varian ({product.variants.length})</span>
            <span className="text-emerald-700 flex items-center gap-1 text-[10px] font-bold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Ready Stock</span>
            </span>
          </div>

          <div className="space-y-1.5">
            {product.variants.map((v) => (
              <div
                key={v.id}
                className="px-2.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-zinc-900 truncate">{v.name}</span>
                  <span className="text-[10px] text-zinc-400 shrink-0">({v.duration})</span>
                </div>
                <span className="font-bold text-zinc-950 shrink-0">
                  Rp{v.price.toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Starting Price & Edit CTA */}
      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400 block font-medium">Harga Mulai</span>
          <span className="text-sm font-extrabold text-zinc-950 block">
            Rp{product.price.toLocaleString('id-ID')}
          </span>
        </div>

        <button
          onClick={() => onEdit(product)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 hover:text-zinc-950 px-2.5 py-1 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Kelola Paket</span>
        </button>
      </div>
    </Card>
  );
};
