'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useStore } from '../../context/StoreContext';
import { AppLogo } from '../AppLogo';

interface CatalogProductCardProps {
  product: Product;
}

export const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useStore();
  const favorited = isWishlisted(product.id);

  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group cursor-pointer bg-white rounded-[22px] md:rounded-[26px] p-3 md:p-3.5 border-[1.5px] border-[#E7DFFB] shadow-2xs hover:shadow-md hover:border-[#B7A3F2] transition-all flex flex-col justify-between"
    >
      {/* Product Visual Container with Favorite Heart Button */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2.5">
        <AppLogo
          type={product.logoType}
          size="lg"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />

        {/* Heart Button in top right */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle Wishlist"
          className="absolute top-2.5 right-2.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#E7DFFB] flex items-center justify-center shadow-xs hover:bg-white active:scale-90 transition-all z-10 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorited ? 'fill-red-500 text-red-500' : 'text-[#7B6FA3]'
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div>
        <h3 className="text-sm md:text-base font-bold font-heading text-[#2F2552] group-hover:text-[#4A3A85] transition-colors truncate">
          {product.name}
        </h3>
        <span className="text-[11px] md:text-xs text-[#7B6FA3] font-bold block leading-tight mt-0.5">
          {product.categoryLabel}
        </span>

        <span className="text-xs md:text-sm font-extrabold text-[#4A3A85] block mt-2">
          Mulai Rp{product.price.toLocaleString('id-ID')}
        </span>
      </div>
    </Link>
  );
};
