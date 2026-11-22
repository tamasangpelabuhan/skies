'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="px-4 py-2.5 rounded-full bg-zinc-950/90 text-white text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-2 border border-white/10">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
