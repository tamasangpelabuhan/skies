'use client';

import React from 'react';
import { ProductVariant } from '../../../types/product';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../../ui/input';

interface AdminProductVariantInputsProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
}

export const AdminProductVariantInputs: React.FC<AdminProductVariantInputsProps> = ({
  variants,
  onChange,
}) => {
  const handleAdd = () => {
    const newVariant: ProductVariant = {
      id: `v_${Date.now()}`,
      name: 'Paket Baru',
      duration: '1 Bulan',
      type: 'Sharing',
      price: 25000,
      description: 'Paket langganan aplikasi premium',
    };
    onChange([...variants, newVariant]);
  };

  const handleUpdate = (idx: number, field: keyof ProductVariant, val: string | number) => {
    const updated = [...variants];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange(updated);
  };

  const handleRemove = (idx: number) => {
    if (variants.length <= 1) return;
    onChange(variants.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-zinc-700">
          Varian Paket Langganan *
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs font-bold text-zinc-950 hover:text-zinc-600 flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Varian</span>
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {variants.map((v, idx) => (
          <div
            key={v.id || idx}
            className="flex items-center gap-2 p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80"
          >
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Nama Varian (misal: 1P2U)"
                value={v.name}
                onChange={(e) => handleUpdate(idx, 'name', e.target.value)}
                className="py-1 px-2.5 text-xs bg-white border-zinc-200"
              />
            </div>
            <div className="w-24">
              <Input
                type="text"
                placeholder="Durasi"
                value={v.duration}
                onChange={(e) => handleUpdate(idx, 'duration', e.target.value)}
                className="py-1 px-2.5 text-xs bg-white border-zinc-200"
              />
            </div>
            <div className="w-28">
              <Input
                type="number"
                placeholder="Harga (Rp)"
                value={v.price}
                onChange={(e) => handleUpdate(idx, 'price', Number(e.target.value))}
                className="py-1 px-2.5 text-xs bg-white border-zinc-200 font-bold"
              />
            </div>
            <button
              type="button"
              disabled={variants.length <= 1}
              onClick={() => handleRemove(idx)}
              className="p-1.5 text-zinc-400 hover:text-red-500 disabled:opacity-30 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
