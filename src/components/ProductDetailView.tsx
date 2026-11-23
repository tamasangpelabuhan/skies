'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageOpen, Star, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types/product';
import { ProductHeader } from './product/ProductHeader';
import { ProductHeroCard } from './product/ProductHeroCard';
import { ProductVariantSelector } from './product/ProductVariantSelector';
import { ProductStickyBar } from './product/ProductStickyBar';
import { Card } from './ui/card';

export const ProductDetailView: React.FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const {
    addToCart,
    initiateSingleCheckout,
    products,
    getProductReviews,
    getProductRating,
    openReviewModalForProduct,
  } = useStore();

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

        {/* Ulasan & Rating Pelanggan */}
        {(() => {
          const productReviews = getProductReviews(product.id || product.slug);
          const { rating: productRating, count: productCount } = getProductRating(product.id || product.slug);

          return (
            <Card className="rounded-[24px] p-5 space-y-4 border-[1.5px] border-[#E7DFFB]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DFFB]/60">
                <div>
                  <h3 className="text-xs font-bold font-heading text-[#4A3A85] uppercase tracking-wider">
                    Ulasan Pelanggan
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-[#F3B62E]">
                      <Star className="w-4 h-4 fill-[#F3B62E] text-[#F3B62E]" />
                      <span className="text-sm font-black font-heading text-[#2F2552]">
                        {productRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-[#7B6FA3] font-semibold">
                      • ({productReviews.length || productCount} ulasan)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openReviewModalForProduct(product)}
                  className="px-3.5 py-1.5 rounded-full bg-[#FFF4CC] border border-[#FFE59A] hover:bg-[#ffe59a] text-xs font-bold text-[#2F2552] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Star className="w-3.5 h-3.5 fill-[#F3B62E] text-[#F3B62E]" />
                  <span>Tulis ulasan</span>
                </button>
              </div>

              {productReviews.length > 0 ? (
                <div className="space-y-3">
                  {productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 rounded-2xl bg-[#F5F1FF]/60 border border-[#E7DFFB]/70 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2F2552]">
                            {rev.customerName}
                          </span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#E8F8EE] text-[#1C6D41] text-[9px] font-extrabold border border-[#BDE8CD]">
                              <ShieldCheck className="w-2.5 h-2.5" />
                              <span>Terverifikasi</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#7B6FA3] font-semibold">
                          {rev.createdAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-0.5 text-[#F3B62E]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#F3B62E] text-[#F3B62E]" />
                        ))}
                      </div>

                      <p className="text-xs text-[#2F2552]/90 leading-relaxed font-medium">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-[#7B6FA3] space-y-1">
                  <p className="font-bold text-[#2F2552]">Belum ada ulasan untuk produk ini</p>
                  <p>Jadilah orang pertama yang memberikan ulasan!</p>
                </div>
              )}
            </Card>
          );
        })()}
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
