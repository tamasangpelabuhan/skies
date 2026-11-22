'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const AboutHeader: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-[#F5F1FF]/95 backdrop-blur-md border-b border-[#E7DFFB] py-3 transition-all">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            aria-label="Kembali"
            className="p-1.5 rounded-full hover:bg-[#E4DCFB]/60 active:scale-95 transition-all text-[#4A3A85] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-base md:text-lg font-bold font-heading text-[#4A3A85] tracking-tight">
            Tentang toko
          </h1>
        </div>
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#7B6FA3] hover:text-[#4A3A85] px-2.5 py-1 rounded-full hover:bg-[#E4DCFB]/50 transition-colors"
        >
          Beranda
        </Link>
      </div>
    </div>
  );
};
