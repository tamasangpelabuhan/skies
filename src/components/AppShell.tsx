'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { ProductDetailModal } from './ProductDetailModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { WishlistModal } from './WishlistModal';
import { NotificationsModal } from './NotificationsModal';
import { ReviewModalWrapper } from './ReviewModalWrapper';
import { Toast } from './Toast';

const AppShellInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '';
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/login';

  if (isAdminRoute) {
    return (
      <div className="w-full h-svh overflow-hidden bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans selection:bg-zinc-950 selection:text-white">
        <Toast />
        {children}
      </div>
    );
  }

  const isCustomFlow = pathname.startsWith('/produk/') || pathname.startsWith('/checkout');
  const isAboutPage = pathname === '/tentang';

  const showHeader = !isCustomFlow && !isAboutPage;
  const showBottomNav = !isCustomFlow;

  return (
    <div className="w-full min-h-screen bg-[#F5F1FF] text-[#2F2552] flex flex-col selection:bg-[#4A3A85] selection:text-white">
      {/* Toast Alert */}
      <Toast />

      {/* Main Header (Only on standard pages: /, /katalog, /pesanan, /bantuan) */}
      {showHeader && <Header />}

      {/* Main Content Container */}
      <main
        className={`flex-1 w-full max-w-[1480px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 ${
          isCustomFlow || isAboutPage ? 'pt-0 pb-20' : 'pt-3 pb-24 md:pb-16'
        }`}
      >
        {children}
      </main>

      {/* Fixed Bottom Navigation (Shown on standard pages & /tentang, hidden on detail & checkout) */}
      {showBottomNav && <BottomNav />}

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal />
      <NotificationsModal />
      <ReviewModalWrapper />
    </div>
  );
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<div className="h-svh w-full bg-[#F5F1FF]">{children}</div>}>
      <AppShellInner>{children}</AppShellInner>
    </Suspense>
  );
};
