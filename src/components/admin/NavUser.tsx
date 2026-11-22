'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronsUpDown, LogOut, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { cn } from '../../lib/utils';

interface NavUserProps {
  onLogout: () => void;
}

export const NavUser: React.FC<NavUserProps> = ({ onLogout }) => {
  const { user } = useAdminAuth();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const displayName = user?.name || 'Administrator';
  const displayEmail = user?.email || 'admin@skies.id';
  const initial = displayName.charAt(0).toUpperCase() || 'A';

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Dropdown Popover */}
      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute bottom-full left-0 mb-2 w-64 rounded-2xl border border-zinc-200/90 bg-white p-2 shadow-xl shadow-zinc-950/10 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {/* User info header */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold text-xs shadow-xs">
              {initial}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-zinc-950 truncate block">
                  {displayName}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                  Admin
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 truncate block">
                {displayEmail}
              </span>
            </div>
          </div>

          <div className="my-1.5 h-px bg-zinc-100" />

          {/* Quick status indicator */}
          <div className="px-2.5 py-2 flex items-center justify-between text-xs text-zinc-600">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-zinc-600">Sesi Login Aktif</span>
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          <div className="my-1.5 h-px bg-zinc-100" />

          {/* External link to store */}
          <Link
            href="/"
            target="_blank"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between w-full px-2.5 py-2 text-xs font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              <span>Buka Toko Publik</span>
            </span>
            <span className="text-[10px] text-zinc-400">Tab Baru</span>
          </Link>

          <div className="my-1.5 h-px bg-zinc-100" />

          {/* Logout button */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex items-center gap-2 w-full px-2.5 py-2 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      )}

      {/* Main trigger button in sidebar footer */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="User menu"
        className={cn(
          'flex w-full items-center gap-3 p-2 rounded-xl text-left transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
          open ? 'bg-zinc-100' : 'hover:bg-zinc-100/80',
          'group-data-[collapsible=icon]:p-1 group-data-[collapsible=icon]:justify-center'
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white font-bold text-xs shadow-xs">
          {initial}
        </div>

        <div className="min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
          <span className="text-xs font-bold text-zinc-900 block truncate leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] text-zinc-400 block truncate leading-tight mt-0.5">
            {displayEmail}
          </span>
        </div>

        <ChevronsUpDown className="w-4 h-4 text-zinc-400 shrink-0 group-data-[collapsible=icon]:hidden" />
      </button>
    </div>
  );
};
