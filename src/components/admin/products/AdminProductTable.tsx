'use client';

import React from 'react';
import { Product } from '../../../types/product';
import { AppLogo } from '../../AppLogo';
import { Star, CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface AdminProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const AdminProductTable: React.FC<AdminProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-50/80 border-b border-zinc-200/80 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Aplikasi & Kategori</th>
              <th className="py-3 px-4">Harga Mulai</th>
              <th className="py-3 px-4">Varian Paket</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <AppLogo
                      type={prod.logoType}
                      size="sm"
                      className="w-10 h-10 rounded-xl shrink-0 border border-zinc-100 shadow-2xs"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-zinc-950 truncate">{prod.name}</div>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mt-0.5">
                        {prod.categoryLabel}
                      </Badge>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className="font-bold text-zinc-900">
                    Rp{prod.price.toLocaleString('id-ID')}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {prod.variants.map((v) => (
                      <span
                        key={v.id}
                        className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-medium"
                      >
                        {v.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{prod.rating.toFixed(1)}</span>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Tersedia</span>
                  </span>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(prod)}
                      className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                      title="Edit Produk"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(prod)}
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
