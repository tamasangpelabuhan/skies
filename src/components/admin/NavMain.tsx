'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LucideIcon,
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  useSidebar,
} from '../ui/sidebar';
import { cn } from '../../lib/utils';

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: number;
  isActive?: boolean;
}

interface NavMainProps {
  unpaidCount?: number;
  processingCount?: number;
}

export const NavMain: React.FC<NavMainProps> = ({
  unpaidCount = 0,
  processingCount = 0,
}) => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const pendingTotal = unpaidCount + processingCount;

  const items: NavItem[] = [
    {
      title: 'Dashboard Ringkasan',
      url: '/admin',
      icon: LayoutDashboard,
      isActive: pathname === '/admin',
    },
    {
      title: 'Kelola Pesanan',
      url: '/admin/pesanan',
      icon: ShoppingBag,
      badge: pendingTotal > 0 ? pendingTotal : undefined,
      isActive: pathname.startsWith('/admin/pesanan'),
    },
    {
      title: 'Katalog Produk',
      url: '/admin/produk',
      icon: Package,
      isActive: pathname.startsWith('/admin/produk'),
    },
    {
      title: 'Pengaturan Toko',
      url: '/admin/pengaturan',
      icon: Settings,
      isActive: pathname.startsWith('/admin/pengaturan'),
    },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;

            return (
              <SidebarMenuItem key={item.url}>
                <Link
                  href={item.url}
                  onClick={handleLinkClick}
                  className="block w-full focus:outline-none"
                >
                  <SidebarMenuButton
                    isActive={active}
                    tooltip={item.title}
                    className="relative group/btn cursor-pointer"
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0 transition-colors',
                        active ? 'text-white' : 'text-zinc-500 group-hover/btn:text-zinc-900'
                      )}
                    />
                    <span className="truncate group-data-[collapsible=icon]:hidden font-medium">
                      {item.title}
                    </span>

                    {item.badge !== undefined && (
                      <SidebarMenuBadge
                        className={cn(
                          'ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full',
                          active
                            ? 'bg-white text-zinc-950 shadow-2xs'
                            : 'bg-zinc-200/90 text-zinc-900'
                        )}
                      >
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
