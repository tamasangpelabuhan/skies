'use client';

import React from 'react';

interface HelpWhatsAppHeroProps {
  onContactAdmin: () => void;
}

export const HelpWhatsAppHero: React.FC<HelpWhatsAppHeroProps> = ({ onContactAdmin }) => {
  return (
    <div className="bg-[#4A3A85] text-[#F5F1FF] rounded-[24px] md:rounded-[28px] p-5 md:p-6 shadow-md space-y-4">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#FFF4CC] border border-[#FFE59A] flex items-center justify-center text-[#2F2552] shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-6 md:h-6 fill-[#2F2552]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.551 1.766.828 2.806.828 3.182 0 5.77-2.587 5.77-5.768 0-3.181-2.587-5.77-5.77-5.77zm0 10.362c-.899 0-1.611-.252-2.392-.716l-.171-.101-1.782.467.476-1.737-.113-.18c-.512-.816-.783-1.493-.783-2.329 0-2.536 2.064-4.601 4.601-4.601 2.538 0 4.602 2.064 4.602 4.601-.001 2.537-2.065 4.601-4.602 4.601z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm md:text-base font-bold font-heading text-white">
            Bantuan dari orang sungguhan.
          </h2>
          <p className="text-xs text-[#E4DCFB] mt-0.5 font-medium">
            Tanya produk atau cek pesananmu.
          </p>
        </div>
      </div>

      <button
        onClick={onContactAdmin}
        className="w-full py-3.5 rounded-full bg-[#FFE59A] hover:bg-[#fedd80] text-[#2F2552] font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm cursor-pointer"
      >
        <span>Chat WhatsApp admin</span>
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-[#2F2552]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.551 1.766.828 2.806.828 3.182 0 5.77-2.587 5.77-5.768 0-3.181-2.587-5.77-5.77-5.77zm0 10.362c-.899 0-1.611-.252-2.392-.716l-.171-.101-1.782.467.476-1.737-.113-.18c-.512-.816-.783-1.493-.783-2.329 0-2.536 2.064-4.601 4.601-4.601 2.538 0 4.602 2.064 4.602 4.601-.001 2.537-2.065 4.601-4.602 4.601z" />
        </svg>
      </button>
    </div>
  );
};
