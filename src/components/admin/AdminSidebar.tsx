'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarSeparator,
} from '../ui/sidebar';
import { NavMain } from './NavMain';
import { NavSecondary } from './NavSecondary';
import { NavUser } from './NavUser';

interface AdminSidebarProps {
  unpaidCount: number;
  processingCount: number;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  unpaidCount,
  processingCount,
  onLogout,
}) => {
  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-200/80 bg-white">
      {/* Top Header - Pure clean typography without logo as requested */}
      <SidebarHeader className="h-14 sm:h-16 shrink-0 border-b border-zinc-200/80 px-4 flex flex-col justify-center">
        <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-bold tracking-tight text-zinc-950 truncate leading-tight">
            Skies by Nas
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 truncate leading-tight mt-0.5">
            Admin Control Center
          </span>
        </div>

        {/* Monogram indicator when collapsed to icon mode */}
        <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
          <span
            title="Skies by Nas - Admin Control Center"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white text-xs font-black shadow-xs select-none cursor-default"
          >
            SN
          </span>
        </div>
      </SidebarHeader>

      {/* Main Navigation Items - Scrollable if content overflows */}
      <SidebarContent>
        <NavMain
          unpaidCount={unpaidCount}
          processingCount={processingCount}
        />
        <NavSecondary />
      </SidebarContent>

      <SidebarSeparator />

      {/* Footer with User info & dropdown (Laravel starter kit style) */}
      <SidebarFooter className="p-2 shrink-0">
        <NavUser onLogout={onLogout} />
      </SidebarFooter>

      {/* Interactive sidebar rail */}
      <SidebarRail />
    </Sidebar>
  );
};
