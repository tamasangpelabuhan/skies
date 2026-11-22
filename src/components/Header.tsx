'use client';

import React from 'react';
import { HeaderMobile } from './layout/HeaderMobile';
import { HeaderDesktop } from './layout/HeaderDesktop';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-[#F5F1FF]/95 backdrop-blur-md border-b border-[#E7DFFB] transition-all">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <HeaderMobile />
        <HeaderDesktop />
      </div>
    </header>
  );
};
