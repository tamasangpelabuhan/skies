'use client';

import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[22px] md:rounded-[26px] p-3 md:p-4 border-[1.5px] border-[#E7DFFB] shadow-2xs flex flex-col justify-between">
      {/* Product Image Square Skeleton */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2.5">
        <Skeleton className="w-full h-full rounded-2xl bg-[#EBE5FB]" />
      </div>

      {/* Product Meta & Title Skeleton */}
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-16 rounded-full bg-[#EBE5FB]" />
        <Skeleton className="h-4.5 w-4/5 rounded-md bg-[#DFD6F9]" />

        {/* Footer: Price & Rating */}
        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#E7DFFB]/60">
          <Skeleton className="h-4 w-20 rounded-md bg-[#DFD6F9]" />
          <Skeleton className="h-3.5 w-10 rounded-md bg-[#EBE5FB]" />
        </div>
      </div>
    </div>
  );
};
