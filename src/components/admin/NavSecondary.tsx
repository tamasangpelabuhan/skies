'use client';

import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, LifeBuoy } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '../ui/sidebar';

export const NavSecondary: React.FC = () => {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupLabel>Akses Cepat</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/"
              target="_blank"
              onClick={handleLinkClick}
              className="block w-full focus:outline-none"
            >
              <SidebarMenuButton
                size="sm"
                tooltip="Buka Toko Publik"
                className="text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              >
                <ExternalLink className="w-4 h-4 shrink-0 text-zinc-400" />
                <span className="truncate group-data-[collapsible=icon]:hidden font-medium">
                  Buka Toko Publik
                </span>
                <span className="ml-auto text-[10px] text-zinc-400 group-data-[collapsible=icon]:hidden">
                  ↗
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link
              href="/bantuan"
              target="_blank"
              onClick={handleLinkClick}
              className="block w-full focus:outline-none"
            >
              <SidebarMenuButton
                size="sm"
                tooltip="Pusat Bantuan & FAQ"
                className="text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              >
                <LifeBuoy className="w-4 h-4 shrink-0 text-zinc-400" />
                <span className="truncate group-data-[collapsible=icon]:hidden font-medium">
                  Pusat Bantuan
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
