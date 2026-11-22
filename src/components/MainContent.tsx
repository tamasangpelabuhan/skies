'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { Header } from './Header';
import { HeroBanner } from './HeroBanner';
import { FeaturedProducts } from './FeaturedProducts';
import { AboutStore } from './AboutStore';
import { Testimonials } from './Testimonials';
import { BottomNav } from './BottomNav';
import { CatalogView } from './CatalogView';
import { OrdersView } from './OrdersView';
import { HelpView } from './HelpView';
import { ProductDetailModal } from './ProductDetailModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { WishlistModal } from './WishlistModal';
import { NotificationsModal } from './NotificationsModal';
import { Toast } from './Toast';

export const MainContent: React.FC = () => {
  const { activeTab } = useStore();

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col selection:bg-zinc-950 selection:text-white">
      {/* Toast Alert */}
      <Toast />

      {/* Responsive Header (Mobile Bar & Desktop Navbar) */}
      <Header />

      {/* Main Container: Wide & Full for Desktop */}
      <main className="flex-1 w-full max-w-[1480px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-3 pb-24 md:pb-16">
        {activeTab === 'beranda' && (
          <div className="animate-in fade-in duration-200 space-y-4 md:space-y-6">
            <HeroBanner />
            <FeaturedProducts />
            <AboutStore />
            <Testimonials />
          </div>
        )}

        {activeTab === 'katalog' && (
          <div className="animate-in fade-in duration-200">
            <CatalogView />
          </div>
        )}

        {activeTab === 'pesanan' && (
          <div className="animate-in fade-in duration-200">
            <OrdersView />
          </div>
        )}

        {activeTab === 'bantuan' && (
          <div className="animate-in fade-in duration-200">
            <HelpView />
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation (Mobile Only, hidden on md & lg) */}
      <BottomNav />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal />
      <NotificationsModal />
    </div>
  );
};
