'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useStore } from '../../context/StoreContext';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const { orders } = useStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-full w-full bg-[#f8f9fa] flex items-center justify-center text-zinc-400 text-xs font-medium">
        Memverifikasi otorisasi admin...
      </div>
    );
  }

  const unpaidCount = orders.filter((o) => o.status === 'Belum dibayar').length;
  const processingCount = orders.filter((o) => o.status === 'Diproses').length;

  return (
    <SidebarProvider className="h-full w-full overflow-hidden">
      <div className="flex h-full w-full overflow-hidden bg-[#f8f9fa] text-zinc-900 font-sans">
        {/* Pinned Desktop & Mobile Sidebar: Does NOT scroll when main page scrolls */}
        <AdminSidebar
          unpaidCount={unpaidCount}
          processingCount={processingCount}
          onLogout={() => {
            logout();
            router.replace('/login');
          }}
        />

        {/* Inset content area: Header stays pinned at top, only main scrolls */}
        <SidebarInset>
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 min-w-0">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
