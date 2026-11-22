'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryId } from '../types/product';
import { CatalogSearchBar } from './catalog/CatalogSearchBar';
import { CatalogFilterPills } from './catalog/CatalogFilterPills';
import { CatalogProductCard } from './catalog/CatalogProductCard';
import { CatalogEmptyState } from './catalog/CatalogEmptyState';

export const CatalogView: React.FC = () => {
  const { searchQuery, setSearchQuery, isWishlisted, wishlist, products, categories } = useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | CategoryId>('all');

  const currentProducts = products || [];

  const categorySections = categories
    .filter((c) => c.id !== 'all')
    .map((c) => ({ id: c.id, title: c.label }));

  const getFilteredProducts = (categoryId?: CategoryId) => {
    return currentProducts.filter((product) => {
      if (categoryId && product.category !== categoryId) return false;
      if (activeFilter === 'favorites' && !isWishlisted(product.id)) return false;
      if (activeFilter !== 'all' && activeFilter !== 'favorites' && product.category !== activeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.categoryLabel.toLowerCase().includes(query) ||
          (product.tagline && product.tagline.toLowerCase().includes(query)) ||
          product.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  };

  const isSearching = searchQuery.trim().length > 0;
  const isFilteringSingle = activeFilter !== 'all';

  return (
    <div className="py-2 pb-24 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-[#4A3A85] tracking-tight">
          Katalog
        </h1>
        <p className="text-xs md:text-sm text-[#7B6FA3] font-semibold">
          Temukan aplikasi yang kamu suka.
        </p>
      </div>

      <CatalogSearchBar value={searchQuery} onChange={setSearchQuery} />

      <CatalogFilterPills
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
        favoritesCount={wishlist.length}
      />

      {/* Conditional Rendering: Sectioned or Single Grid */}
      {isSearching || isFilteringSingle ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7B6FA3]">
              Menampilkan {getFilteredProducts().length} produk
            </span>
          </div>

          {getFilteredProducts().length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
              {getFilteredProducts().map((product) => (
                <CatalogProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <CatalogEmptyState />
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {categorySections.map((section) => {
            const sectionProducts = getFilteredProducts(section.id);
            if (sectionProducts.length === 0) return null;

            return (
              <div key={section.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base md:text-lg font-bold font-heading text-[#4A3A85] tracking-tight">
                    {section.title}
                  </h2>
                  <button
                    onClick={() => setActiveFilter(section.id)}
                    className="text-xs font-bold text-[#7B6FA3] hover:text-[#4A3A85] inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Lihat kategori</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                  {sectionProducts.map((product) => (
                    <CatalogProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
