'use client';

import React, { useState } from 'react';
import { Category } from '../../../data/categories';
import { Product } from '../../../types/product';
import { X, Plus, Trash2, Tag, Layers } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface AdminCategoryManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  products: Product[];
  onAddCategory: (label: string) => void;
  onDeleteCategory: (catId: string) => void;
}

export const AdminCategoryManageModal: React.FC<AdminCategoryManageModalProps> = ({
  isOpen,
  onClose,
  categories,
  products,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [newCatLabel, setNewCatLabel] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatLabel.trim()) {
      onAddCategory(newCatLabel.trim());
      setNewCatLabel('');
    }
  };

  const getProductCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  const activeCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-950">Kelola Kategori Toko</h3>
              <span className="text-[11px] text-zinc-400">Terhubung langsung ke tabel produk</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Add Category Form */}
          <form onSubmit={handleAdd} className="flex gap-2">
            <Input
              type="text"
              placeholder="Nama Kategori Baru (misal: VPN & Tools)"
              value={newCatLabel}
              onChange={(e) => setNewCatLabel(e.target.value)}
              className="border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950"
            />
            <Button
              type="submit"
              className="py-2.5 px-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </Button>
          </form>

          {/* Categories List */}
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">
              Daftar Kategori Aktif:
            </span>
            {activeCategories.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-400 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                Belum ada kategori. Masukkan nama kategori di atas lalu klik Tambah.
              </div>
            ) : (
              activeCategories.map((cat) => {
                const count = getProductCount(cat.id);

                return (
                  <div
                    key={cat.id}
                    className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="font-bold text-zinc-900">{cat.label}</span>
                      <span className="px-2 py-0.5 rounded-full bg-zinc-200/80 text-[10px] font-bold text-zinc-600">
                        {count} produk
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteCategory(cat.id)}
                      className="p-1 text-zinc-400 hover:text-red-500 cursor-pointer"
                      title="Hapus kategori"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <Button
            onClick={onClose}
            className="rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs px-5 py-2.5"
          >
            Selesai
          </Button>
        </div>
      </div>
    </div>
  );
};
