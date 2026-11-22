'use client';

import React, { useState } from 'react';
import { Product, CategoryId } from '../../types/product';
import { useStore } from '../../context/StoreContext';
import { AdminProductStats } from './products/AdminProductStats';
import { AdminProductFilter } from './products/AdminProductFilter';
import { AdminProductCard } from './products/AdminProductCard';
import { AdminProductTable } from './products/AdminProductTable';
import { AdminProductFormModal } from './products/AdminProductFormModal';
import { AdminDeleteProductDialog } from './products/AdminDeleteProductDialog';
import { AdminCategoryManageModal } from './products/AdminCategoryManageModal';
import { PackageOpen, Plus } from 'lucide-react';
import { Button } from '../ui/button';

export const AdminProductsView: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.variants?.some((v) => v.name.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = (saved: Product) => {
    if (editingProduct) {
      updateProduct(saved.id, saved);
    } else {
      addProduct(saved);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. KPI Stats Summary Bar */}
      <AdminProductStats products={products} categories={categories} />

      {/* 2. Filter Toolbar (Search, Categories, View Mode Toggle, Actions) */}
      <AdminProductFilter
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        products={products}
        onAddProduct={handleOpenCreate}
        onManageCategories={() => setIsCategoryModalOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* 3. Products Header Info */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>
          Menampilkan <strong className="text-zinc-900">{filteredProducts.length}</strong> dari{' '}
          {products.length} aplikasi terdaftar
        </span>
      </div>

      {/* 4. Products Presentation (Grid vs Table) */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white border border-zinc-200/80 rounded-2xl shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
            <PackageOpen className="w-6 h-6" />
          </div>
          <div className="max-w-sm mx-auto">
            <h3 className="text-sm font-bold text-zinc-950">Tidak ada produk ditemukan</h3>
            <p className="text-xs text-zinc-400 mt-1">
              {search
                ? `Tidak ada aplikasi yang cocok dengan kata kunci "${search}".`
                : 'Belum ada aplikasi di kategori ini. Tambahkan aplikasi baru untuk mulai menjual.'}
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleOpenCreate}
            className="mt-2 rounded-xl bg-zinc-950 text-white font-semibold text-xs shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk Baru</span>
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((prod) => (
            <AdminProductCard
              key={prod.id}
              product={prod}
              onEdit={handleOpenEdit}
              onDelete={(p) => setDeletingProduct(p)}
            />
          ))}
        </div>
      ) : (
        <AdminProductTable
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={(p) => setDeletingProduct(p)}
        />
      )}

      {/* Form Modal (Create / Edit) */}
      <AdminProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        productToEdit={editingProduct}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Dialog */}
      <AdminDeleteProductDialog
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={(id) => {
          deleteProduct(id);
          setDeletingProduct(null);
        }}
      />

      {/* Category Management Modal */}
      <AdminCategoryManageModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        products={products}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
      />
    </div>
  );
};
