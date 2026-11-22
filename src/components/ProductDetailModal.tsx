'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Zap, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AppLogo } from './AppLogo';
import { ProductVariant } from '../types/product';
import { ProductModalVariantList } from './modals/ProductModalVariantList';
import { ProductModalQuantity } from './modals/ProductModalQuantity';
import { ProductModalFooter } from './modals/ProductModalFooter';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    initiateSingleCheckout,
    toggleWishlist,
    isWishlisted,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct && selectedProduct.variants.length > 0) {
      setSelectedVariant(selectedProduct.variants[0]);
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const currentVariant = selectedVariant || selectedProduct.variants[0];
  const favorited = isWishlisted(selectedProduct.id);

  const handleAddToCart = () => {
    if (currentVariant) {
      addToCart(selectedProduct, currentVariant, quantity);
      setSelectedProduct(null);
    }
  };

  const handleBuyNow = () => {
    if (currentVariant) {
      initiateSingleCheckout(selectedProduct, currentVariant, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2F2552]/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border-[1.5px] border-[#E7DFFB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-5 pb-3 flex items-center justify-between border-b border-[#E7DFFB]/60">
          <div className="flex items-center gap-3">
            <AppLogo type={selectedProduct.logoType} size="sm" />
            <div>
              <span className="text-[11px] font-bold text-[#7B6FA3] block">
                {selectedProduct.categoryLabel}
              </span>
              <h3 className="text-base font-bold font-heading text-[#4A3A85] leading-tight">
                {selectedProduct.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className="p-2 rounded-full hover:bg-[#F5F1FF] text-[#7B6FA3] transition-colors cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : ''}`}
              />
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-full hover:bg-[#F5F1FF] text-[#7B6FA3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-zinc-800">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span className="font-semibold text-[11px]">Garansi Penuh 30 Hari</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-amber-50 text-amber-900 border border-amber-100">
              <Zap className="w-4 h-4 shrink-0 text-amber-600" />
              <span className="font-semibold text-[11px]">Proses Cepat 5-15 Menit</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-900 mb-1">Deskripsi Produk</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          <ProductModalVariantList
            variants={selectedProduct.variants}
            selectedVariant={currentVariant}
            onSelect={setSelectedVariant}
          />

          <ProductModalQuantity
            quantity={quantity}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrease={() => setQuantity((q) => q + 1)}
          />

          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600">
            <h5 className="font-bold text-zinc-900 mb-1.5">Syarat & Garansi</h5>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              {selectedProduct.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <ProductModalFooter
          totalPrice={((currentVariant?.price || selectedProduct.price) * quantity)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </div>
    </div>
  );
};
