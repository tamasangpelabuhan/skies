import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-zinc-950 text-white shadow-xs hover:bg-zinc-800',
        destructive: 'bg-red-500 text-white shadow-xs hover:bg-red-600',
        outline: 'border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-900 shadow-2xs',
        secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80',
        ghost: 'hover:bg-zinc-100 hover:text-zinc-900',
        link: 'text-zinc-950 underline-offset-4 hover:underline',
        success: 'bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-xs',
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-8 px-3.5 text-[11px] rounded-xl',
        lg: 'h-12 px-6 text-sm rounded-2xl',
        icon: 'h-9 w-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
