'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageOpen } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types/product';
import { ProductHeader } from './product/ProductHeader';
import { ProductHeroCard } from './product/ProductHeroCard';
import { ProductVariantSelector } from './product/ProductVariantSelector';
import { ProductStickyBar } from './product/ProductStickyBar';
import { Card } from './ui/card';

export const ProductDetailView: React.FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const { addToCart, initiateSingleCheckout, products } = useStore();

  const currentProducts = products || [];
  const product = currentProducts.find((p) => p.slug === slug || p.id === slug);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  );
  const [quantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F1FF] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <PackageOpen className="w-12 h-12 text-[#7B6FA3]" />
        <h2 className="text-base font-bold font-heading text-[#4A3A85]">Produk Tidak Ditemukan</h2>
        <p className="text-xs text-[#7B6FA3] max-w-xs">
          Produk yang Anda cari belum tersedia atau telah dihapus.
        </p>
        <button
          onClick={() => router.push('/katalog')}
          className="px-5 py-2.5 rounded-full bg-[#4A3A85] text-white text-xs font-bold hover:bg-[#3d2f70] transition-all cursor-pointer shadow-xs"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const activeVariant = selectedVariant || product.variants[0];
  const totalPrice = activeVariant ? activeVariant.price * quantity : product.price;

  const handleAddToCart = () => {
    if (activeVariant) addToCart(product, activeVariant, quantity);
  };

  const handleBuyNow = () => {
    if (activeVariant) {
      initiateSingleCheckout(product, activeVariant, quantity);
      router.push(`/checkout?slug=${product.slug}&variant=${activeVariant.id}&qty=${quantity}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1FF] pb-32">
      <ProductHeader productId={product.id} />

      <div className="space-y-6 pt-4 max-w-2xl mx-auto px-4 sm:px-0">
        <ProductHeroCard product={product} />

        {product.variants.length > 0 && activeVariant && (
          <ProductVariantSelector
            variants={product.variants}
            selectedVariant={activeVariant}
            onSelect={setSelectedVariant}
          />
        )}

        <Card className="rounded-[24px] p-5 space-y-3 border-[1.5px] border-[#E7DFFB]">
          <h3 className="text-xs font-bold font-heading text-[#4A3A85] uppercase tracking-wider">
            Deskripsi Produk
          </h3>
          <p className="text-xs text-[#2F2552]/85 leading-relaxed font-normal">
            {product.description}
          </p>

          {product.rules && product.rules.length > 0 && (
            <div className="pt-2 border-t border-[#E7DFFB]/60">
              <span className="text-xs font-bold font-heading text-[#4A3A85] block mb-1.5">
                Ketentuan & Garansi:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#7B6FA3] font-medium">
                {product.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>

      {activeVariant && (
        <ProductStickyBar
          selectedVariant={activeVariant}
          totalPrice={totalPrice}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}
    </div>
  );
};
