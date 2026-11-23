'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Star, ArrowRight, PackageOpen } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AppLogo } from './AppLogo';
import { ProductCardSkeleton } from './catalog/ProductCardSkeleton';

export const FeaturedProducts: React.FC = () => {
  const { products, isProductsLoading, toggleWishlist, isWishlisted, getProductRating } = useStore();
  const currentProducts = products || [];
  const featured = currentProducts.slice(0, 4);

  // 1. Loading Skeleton State (shadcn UI skeleton cards)
  if (isProductsLoading) {
    return (
      <section className="py-3">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-lg md:text-xl font-bold font-heading text-[#4A3A85] tracking-tight">
              Produk unggulan
            </h2>
            <p className="text-xs text-[#7B6FA3] mt-0.5">
              Aplikasi paling banyak dipesan dengan garansi terbaik
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // 2. Empty State (only after loading is complete and genuinely empty)
  if (featured.length === 0) {
    return (
      <section className="py-3">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-lg md:text-xl font-bold font-heading text-[#4A3A85] tracking-tight">
              Produk unggulan
            </h2>
            <p className="text-xs text-[#7B6FA3] mt-0.5">
              Aplikasi paling banyak dipesan dengan garansi terbaik
            </p>
          </div>
        </div>

        <div className="p-8 text-center bg-white rounded-3xl border-[1.5px] border-[#E7DFFB] shadow-2xs space-y-2">
          <PackageOpen className="w-8 h-8 text-[#7B6FA3] mx-auto" />
          <p className="text-xs font-bold text-[#2F2552]">Belum ada produk unggulan</p>
          <p className="text-[11px] text-[#7B6FA3]">
            Tambahkan produk baru melalui halaman admin untuk menampilkannya di sini.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-3">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-lg md:text-xl font-bold font-heading text-[#4A3A85] tracking-tight">
            Produk unggulan
          </h2>
          <p className="hidden sm:block text-xs text-[#7B6FA3] font-semibold mt-0.5">
            Aplikasi paling banyak dipesan dengan garansi terbaik
          </p>
        </div>
        <Link
          href="/katalog"
          className="text-xs font-bold text-[#7B6FA3] hover:text-[#4A3A85] inline-flex items-center gap-1 transition-colors group"
        >
          <span>Lihat semua</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
        {featured.map((product) => {
          const favorited = isWishlisted(product.id);
          const ratingInfo = getProductRating(product.id || product.slug);

          return (
            <Link
              key={product.id}
              href={`/produk/${product.slug}`}
              className="group cursor-pointer bg-white rounded-[22px] md:rounded-[26px] p-3 md:p-4 border-[1.5px] border-[#E7DFFB] shadow-2xs hover:shadow-md hover:border-[#B7A3F2] transition-all flex flex-col justify-between"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2.5">
                <AppLogo
                  type={product.logoType}
                  size="lg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  aria-label="Toggle Wishlist"
                  className="absolute top-2.5 right-2.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#E7DFFB] flex items-center justify-center shadow-xs hover:bg-white active:scale-90 transition-all z-10"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorited ? 'fill-red-500 text-red-500' : 'text-[#7B6FA3]'
                    }`}
                  />
                </button>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#7B6FA3] block leading-tight">
                  {product.categoryLabel}
                </span>
                <h3 className="text-sm md:text-base font-bold font-heading text-[#2F2552] mt-0.5 group-hover:text-[#4A3A85] transition-colors truncate">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#E7DFFB]/60">
                  <span className="text-[13px] md:text-sm font-extrabold text-[#4A3A85]">
                    Rp{product.price.toLocaleString('id-ID')}
                  </span>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#F3B62E]">
                    <Star className="w-3 h-3 fill-[#F3B62E] text-[#F3B62E]" />
                    <span className="text-[#2F2552]">{ratingInfo.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-[#7B6FA3]">({ratingInfo.count})</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
