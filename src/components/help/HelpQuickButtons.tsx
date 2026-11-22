'use client';

import React from 'react';
import { HelpCircle, BookOpen, ShieldCheck } from 'lucide-react';

interface HelpQuickButtonsProps {
  onScrollTo: (id: string) => void;
}

export const HelpQuickButtons: React.FC<HelpQuickButtonsProps> = ({ onScrollTo }) => {
  return (
    <div className="grid grid-cols-3 gap-2.5 md:gap-4">
      {/* FAQ Card */}
      <button
        onClick={() => onScrollTo('faq-section')}
        className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 border border-zinc-100 shadow-xs hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer active:scale-95"
      >
        <HelpCircle className="w-5 h-5 text-zinc-800 stroke-[1.8]" />
        <span className="text-xs font-bold text-zinc-900">FAQ</span>
      </button>

      {/* Cara order Card */}
      <button
        onClick={() => onScrollTo('cara-order-section')}
        className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 border border-zinc-100 shadow-xs hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer active:scale-95"
      >
        <BookOpen className="w-5 h-5 text-zinc-800 stroke-[1.8]" />
        <span className="text-xs font-bold text-zinc-900">Cara order</span>
      </button>

      {/* Garansi Card */}
      <button
        onClick={() => onScrollTo('garansi-section')}
        className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 border border-zinc-100 shadow-xs hover:border-zinc-300 hover:shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer active:scale-95"
      >
        <ShieldCheck className="w-5 h-5 text-zinc-800 stroke-[1.8]" />
        <span className="text-xs font-bold text-zinc-900">Garansi</span>
      </button>
    </div>
  );
};
