'use client';

import * as React from 'react';
import { PanelLeft, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3.5rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean | ((value: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [openMobile, setOpenMobile] = React.useState(false);

    // Internal open state for uncontrolled usage
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp !== undefined ? openProp : _open;

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        try {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        } catch {
          // ignore cookie errors
        }
      },
      [setOpenProp, open]
    );

    // Listen to media query for responsive layout
    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev);
    }, [isMobile, setOpen]);

    // Keyboard shortcut (Cmd+B or Ctrl+B)
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex h-full w-full text-zinc-950 overflow-hidden',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';

export interface SidebarProps extends React.ComponentProps<'aside'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'icon',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { state, openMobile, setOpenMobile } = useSidebar();

    // Close mobile sheet on escape
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && openMobile) {
          setOpenMobile(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [openMobile, setOpenMobile]);

    return (
      <>
        {/* ======================================================== */}
        {/* MOBILE DRAWER & BACKDROP (< 640px)                       */}
        {/* ======================================================== */}
        <div
          onClick={() => setOpenMobile(false)}
          aria-hidden="true"
          className={cn(
            'fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 sm:hidden',
            openMobile
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        />

        <div
          data-mobile="true"
          data-state={openMobile ? 'open' : 'closed'}
          className={cn(
            'fixed inset-y-0 z-50 flex h-full w-[var(--sidebar-width-mobile)] flex-col bg-white border-r border-zinc-200/80 text-zinc-950 shadow-2xl transition-transform duration-300 ease-in-out sm:hidden',
            side === 'left'
              ? openMobile
                ? 'translate-x-0'
                : '-translate-x-full'
              : openMobile
                ? 'translate-x-0'
                : 'translate-x-full'
          )}
          style={
            {
              '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          {/* Close button for mobile */}
          <button
            onClick={() => setOpenMobile(false)}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer z-10"
            aria-label="Tutup Menu"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex h-full w-full flex-col overflow-hidden">{children}</div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP SIDEBAR (>= 640px): PINNED, NEVER SCROLLS WITH PAGE */}
        {/* ======================================================== */}
        <aside
          ref={ref}
          data-state={state}
          data-collapsible={state === 'collapsed' ? collapsible : ''}
          data-variant={variant}
          data-side={side}
          className={cn(
            'group peer hidden sm:flex h-full flex-col shrink-0 border-r border-zinc-200/80 bg-white transition-[width] duration-200 ease-in-out z-20 overflow-hidden select-none',
            state === 'expanded' ? 'w-64' : 'w-14',
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col overflow-hidden"
          >
            {children}
          </div>
        </aside>
      </>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="trigger"
      type="button"
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 cursor-pointer',
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      aria-label="Toggle Sidebar"
      {...props}
    >
      <PanelLeft className="w-4 h-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar Rail"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-zinc-300 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex cursor-w-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        className
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = 'SidebarRail';

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="inset"
      className={cn(
        'relative flex h-full flex-1 flex-col bg-[#f8f9fa] min-w-0 overflow-hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn('flex flex-col shrink-0 gap-2 p-3', className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn('flex flex-col shrink-0 gap-2 p-3 mt-auto', className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

export const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="separator"
      className={cn('mx-3 h-px bg-zinc-200/80 my-1 shrink-0', className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = 'SidebarSeparator';

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden px-3 py-2 scrollbar-none',
        className
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col py-1 shrink-0', className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = 'SidebarGroup';

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        'flex h-7 shrink-0 items-center px-2 text-[11px] font-semibold tracking-wider uppercase text-zinc-400 group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        'absolute right-2 top-1.5 flex h-5 w-5 items-center justify-center rounded-md p-0 text-zinc-400 hover:text-zinc-900 group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = 'SidebarGroupAction';

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = 'SidebarGroupContent';

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1 list-none p-0 m-0', className)}
      {...props}
    />
  );
});
SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn('group/menu-item relative list-none', className)}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
  size?: 'default' | 'sm' | 'lg';
  tooltip?: string;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      asChild = false,
      isActive = false,
      size = 'default',
      tooltip,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      default: 'h-9 px-2.5 text-xs',
      sm: 'h-8 px-2 text-xs',
      lg: 'h-10 px-3 text-sm',
    };

    return (
      <button
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        title={tooltip}
        className={cn(
          'peer/menu-button flex w-full items-center gap-2.5 rounded-xl font-medium transition-colors select-none text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
          sizeClasses[size],
          isActive
            ? 'bg-zinc-950 text-white font-semibold shadow-xs'
            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950',
          'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        'ml-auto flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-opacity group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarMenuBadge.displayName = 'SidebarMenuBadge';
