import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-zinc-950 text-white',
        secondary: 'border-transparent bg-zinc-100 text-zinc-800',
        destructive: 'border border-red-200/80 bg-red-50 text-red-600',
        outline: 'border border-zinc-200 bg-white text-zinc-800',
        success: 'border border-emerald-200/60 bg-[#ECFDF5] text-[#059669]',
        warning: 'border border-amber-200/60 bg-[#FEF3C7] text-[#B45309]',
        info: 'border border-blue-200/60 bg-[#EFF6FF] text-[#1D4ED8]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
