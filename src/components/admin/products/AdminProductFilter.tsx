'use client';

import React from 'react';
import { Search, Plus, Layers, X, LayoutGrid, List } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { CategoryId, Product } from '../../../types/product';
import { Category } from '../../../data/categories';

interface AdminProductFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: CategoryId;
  onCategoryChange: (cat: CategoryId) => void;
  categories: Category[];
  products: Product[];
  onAddProduct: () => void;
  onManageCategories: () => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
}

export const AdminProductFilter: React.FC<AdminProductFilterProps> = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  products,
  onAddProduct,
  onManageCategories,
  viewMode,
  onViewModeChange,
}) => {
  const getCategoryCount = (catId: CategoryId) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <div className="space-y-3.5 bg-white border border-zinc-200/80 p-3.5 sm:p-4 rounded-2xl shadow-2xs">
      {/* Search & Action Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Cari aplikasi atau varian..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 pl-9 pr-8 rounded-xl bg-zinc-50/60 border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950 focus-visible:bg-white transition-colors"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-0.5 cursor-pointer"
              title="Reset pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* View Mode Toggle (Grid vs Table) */}
          <div className="flex items-center border border-zinc-200 rounded-xl p-0.5 bg-zinc-50">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-zinc-950 shadow-2xs font-bold'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
              title="Tampilan Grid (Kartu)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-zinc-950 shadow-2xs font-bold'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
              title="Tampilan Tabel"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onManageCategories}
            className="h-9 px-3 rounded-xl border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Kelola Kategori</span>
            <span className="sm:hidden">Kategori</span>
          </Button>

          <Button
            size="sm"
            onClick={onAddProduct}
            className="h-9 px-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
          </Button>
        </div>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-950 text-white shadow-2xs'
                  : 'bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-zinc-500 border border-zinc-200/60'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
