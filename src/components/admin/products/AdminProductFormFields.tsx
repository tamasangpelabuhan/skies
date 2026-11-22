'use client';

import React from 'react';
import { CategoryId } from '../../../types/product';
import { Input } from '../../ui/input';
import { useStore } from '../../../context/StoreContext';
import { AdminProductImageUploader } from './AdminProductImageUploader';

interface AdminProductFormFieldsProps {
  name: string;
  setName: (v: string) => void;
  category: CategoryId;
  setCategory: (v: CategoryId) => void;
  logoType: string;
  setLogoType: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}

export const AdminProductFormFields: React.FC<AdminProductFormFieldsProps> = ({
  name,
  setName,
  category,
  setCategory,
  logoType,
  setLogoType,
  description,
  setDescription,
}) => {
  const { categories } = useStore();
  const availableCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-700 font-bold mb-1">Nama Aplikasi *</label>
          <Input
            type="text"
            required
            placeholder="Contoh: Disney+ Hotstar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-zinc-200 text-zinc-900 focus-visible:ring-zinc-950"
          />
        </div>

        <div>
          <label className="block text-zinc-700 font-bold mb-1">Kategori *</label>
          {availableCategories.length === 0 ? (
            <div className="p-2.5 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 text-zinc-400 text-xs">
              Belum ada kategori. Tambahkan di menu &quot;Kelola Kategori&quot;.
            </div>
          ) : (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="w-full p-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:ring-2 focus:ring-zinc-950 focus:outline-none"
            >
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <AdminProductImageUploader value={logoType} onChange={setLogoType} />

      <div>
        <label className="block text-zinc-700 font-bold mb-1">Deskripsi Singkat</label>
        <textarea
          rows={2}
          required
          placeholder="Deskripsi singkat produk..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:ring-2 focus:ring-zinc-950 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};
