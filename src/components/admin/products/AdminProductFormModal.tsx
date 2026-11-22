'use client';

import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, CategoryId } from '../../../types/product';
import { X, Check } from 'lucide-react';
import { Button } from '../../ui/button';
import { useStore } from '../../../context/StoreContext';
import { AdminProductFormFields } from './AdminProductFormFields';
import { AdminProductVariantInputs } from './AdminProductVariantInputs';

interface AdminProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  onSave: (product: Product) => void;
}

const DEFAULT_VARIANT: ProductVariant = {
  id: 'v1',
  name: '1 Bulan Sharing',
  duration: '1 Bulan',
  type: 'Sharing',
  price: 25000,
  description: 'Paket langganan sharing',
};

export const AdminProductFormModal: React.FC<AdminProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSave,
}) => {
  const { categories } = useStore();
  const availableCategories = categories.filter((c) => c.id !== 'all');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryId>('');
  const [logoType, setLogoType] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState<ProductVariant[]>([DEFAULT_VARIANT]);

  useEffect(() => {
    const firstCat = availableCategories[0]?.id || '';
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setLogoType(productToEdit.logoType || '');
      setDescription(productToEdit.description);
      setVariants(productToEdit.variants);
    } else {
      setName('');
      setCategory(firstCat);
      setLogoType('');
      setDescription('');
      setVariants([DEFAULT_VARIANT]);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      alert('Silakan buat kategori produk terlebih dahulu melalui tombol "Kelola Kategori".');
      return;
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const matchedCategory = categories.find((c) => c.id === category);

    const savedProduct: Product = {
      id: productToEdit ? productToEdit.id : `prod_${Date.now()}`,
      name,
      slug: productToEdit ? productToEdit.slug : slug,
      category,
      categoryLabel: matchedCategory ? matchedCategory.label : 'Aplikasi Premium',
      tagline: productToEdit?.tagline || `Langganan ${name} harga murah bergaransi`,
      price: variants.length > 0 ? Math.min(...variants.map((v) => v.price)) : 25000,
      rating: productToEdit?.rating || 4.9,
      reviewCount: productToEdit?.reviewCount || 120,
      themeColor: productToEdit?.themeColor || '#18181b',
      bgGradient: productToEdit?.bgGradient || 'from-zinc-900 to-black',
      warrantyDays: productToEdit?.warrantyDays || 30,
      rules: productToEdit?.rules || [
        'Dilarang mengubah email atau password akun.',
        'Gunakan profil sesuai yang diberikan admin.',
      ],
      logoType,
      variants,
      description,
    };

    onSave(savedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-950">
            {productToEdit ? `Edit Produk: ${productToEdit.name}` : 'Tambah Produk Baru'}
          </h3>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          <AdminProductFormFields
            name={name}
            setName={setName}
            category={category}
            setCategory={setCategory}
            logoType={logoType}
            setLogoType={setLogoType}
            description={description}
            setDescription={setDescription}
          />

          <AdminProductVariantInputs variants={variants} onChange={setVariants} />

          <div className="pt-3 border-t border-zinc-100 flex items-center gap-2.5">
            <Button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{productToEdit ? 'Simpan Perubahan' : 'Buat Produk'}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="py-3 px-5 rounded-2xl border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-bold cursor-pointer"
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
