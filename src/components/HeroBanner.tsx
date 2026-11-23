'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badge: 'UPGRADE HARI-HARIMU',
      title: 'Semua aplikasi.\nSatu tempat.',
      subtitle: 'Streaming, belajar, musik, dan kerja kreatif. Pilih paket yang pas untukmu.',
      buttonText: 'Jelajahi katalog',
    },
    {
      badge: 'GARANSI FULL 30 HARI',
      title: 'Aman, Legal,\n& Cepat Aktif.',
      subtitle: 'Pilihan akun sharing atau private resmi dengan harga pelajar.',
      buttonText: 'Lihat promo',
    },
  ];

  return (
    <div className="pt-2 pb-2 md:pb-4 space-y-3 sm:space-y-4">
      {/* Top Brand Banner Image matching user mockup */}
      <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[26px] md:rounded-[32px] border-[1.5px] border-[#E7DFFB] shadow-2xs bg-[#C9DCF8]">
        <img
          src="/image/banner.jpg"
          alt="Skies by Nas Banner"
          className="w-full h-auto object-cover max-h-[160px] sm:max-h-[240px] md:max-h-[320px]"
        />
      </div>

      {/* Main Hero Banner */}
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-[#B7A3F2] text-[#2F2552] p-4 sm:p-6 md:p-8 lg:p-10 border border-[#E7DFFB] shadow-sm min-h-[150px] sm:min-h-[195px] md:min-h-[240px] flex items-center">
        {/* Decorative Stars matching Netlify .star */}
        <div
          className="absolute top-4 right-1/3 w-6 h-6 bg-[#FFE59A] opacity-80 pointer-events-none animate-pulse"
          style={{
            clipPath: 'polygon(50% 0, 62% 36%, 100% 38%, 70% 60%, 80% 100%, 50% 76%, 20% 100%, 30% 60%, 0 38%, 38% 36%)',
          }}
        />
        <div
          className="absolute bottom-5 left-1/4 w-4 h-4 bg-[#FFE59A] opacity-90 pointer-events-none"
          style={{
            clipPath: 'polygon(50% 0, 62% 36%, 100% 38%, 70% 60%, 80% 100%, 50% 76%, 20% 100%, 30% 60%, 0 38%, 38% 36%)',
          }}
        />
        <div
          className="absolute top-8 right-12 w-8 h-8 bg-[#FFE59A] opacity-75 pointer-events-none hidden md:block"
          style={{
            clipPath: 'polygon(50% 0, 62% 36%, 100% 38%, 70% 60%, 80% 100%, 50% 76%, 20% 100%, 30% 60%, 0 38%, 38% 36%)',
          }}
        />

        <div className="relative z-10 w-full flex flex-row items-center justify-between gap-3 sm:gap-6 md:gap-8">
          {/* Left Text Content */}
          <div className="flex-1 min-w-0 pr-1 sm:pr-4 flex flex-col justify-center">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] md:text-xs font-black tracking-wider text-[#4A3A85] bg-[#FFF4CC] border border-[#FFE59A] px-2 sm:px-2.5 py-0.5 rounded-full uppercase">
                  {slides[activeSlide].badge}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/50 border border-white/60 text-[11px] font-bold text-[#2F2552]">
                  <Star className="w-3 h-3 fill-[#F3B62E] text-[#F3B62E]" />
                  <span>Rating 4.9/5</span>
                </span>
              </div>

              <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold font-heading leading-[1.18] text-[#2F2552] mt-1.5 sm:mt-2.5 whitespace-pre-line tracking-tight">
                {slides[activeSlide].title}
              </h1>

              <p className="text-[10px] sm:text-xs md:text-sm font-semibold leading-relaxed text-[#2F2552]/85 mt-1 sm:mt-2 max-w-sm sm:max-w-md line-clamp-2 sm:line-clamp-none">
                {slides[activeSlide].subtitle}
              </p>

              {/* Badges on desktop */}
              <div className="hidden md:flex items-center gap-4 mt-3 text-xs text-[#2F2552]/90 font-bold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4A3A85]" />
                  <span>Garansi Full 30 Hari</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#4A3A85]" />
                  <span>Aktif 5-15 Menit</span>
                </div>
              </div>
            </div>

            <Link
              href="/katalog"
              className="mt-2.5 sm:mt-4 md:mt-5 self-start inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 rounded-full bg-[#FFE59A] text-[#2F2552] hover:bg-[#fedd7d] text-[11px] sm:text-xs md:text-sm font-extrabold active:scale-95 transition-all shadow-sm group shrink-0"
            >
              <span>{slides[activeSlide].buttonText}</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Visual Floating Cards: Always side-by-side on right */}
          <div className="relative w-28 sm:w-44 md:w-56 lg:w-64 h-28 sm:h-36 md:h-48 lg:h-52 shrink-0 flex items-center justify-center select-none">
            {/* YouTube Card (visible on desktop) */}
            <div className="hidden lg:flex absolute top-2 left-2 w-[85px] h-[60px] rounded-2xl bg-red-600 shadow-lg shadow-red-950/20 transform -rotate-[12deg] hover:-rotate-[4deg] transition-all duration-300 items-center justify-center p-2 border border-white/20">
              <div className="flex items-center gap-1 text-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="font-extrabold text-[11px]">YouTube</span>
              </div>
            </div>

            {/* Spotify Card (top-right tilted) */}
            <div className="absolute top-1 sm:top-2 right-0 sm:right-2 md:right-4 w-[74px] sm:w-[105px] md:w-[135px] lg:w-[150px] h-[50px] sm:h-[70px] md:h-[88px] lg:h-[98px] rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#1DB954] shadow-lg shadow-emerald-950/20 transform rotate-[7deg] hover:rotate-[3deg] transition-all duration-300 p-1.5 sm:p-2.5 flex flex-col justify-center items-center border border-white/30">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.792-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.809-.87 7.076-.496 9.721 1.115.295.18.387.563.207.855zm1.225-2.724c-.226.368-.71.485-1.077.26-2.69-1.653-6.79-2.133-9.97-1.168-.413.125-.853-.112-.978-.525-.125-.413.112-.853.525-.978 3.633-1.103 8.147-.568 11.24 1.334.367.226.484.71.26 1.077zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.129-1.168-.623-.15-.495.13-1.019.624-1.169 3.532-1.072 9.404-.866 13.115 1.338.445.264.59.842.327 1.287-.264.446-.843.59-1.278.322z" />
                </svg>
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-[9px] sm:text-xs md:text-sm font-black text-black leading-tight">Spotify</span>
                  <span className="text-[7px] sm:text-[10px] md:text-xs font-bold text-black/80">Premium</span>
                </div>
              </div>
            </div>

            {/* Netflix Card (bottom-left tilted, overlapping) */}
            <div className="absolute bottom-1 sm:bottom-2 left-0 sm:left-2 md:left-6 w-[56px] sm:w-[80px] md:w-[105px] lg:w-[120px] h-[56px] sm:h-[80px] md:h-[105px] lg:h-[120px] rounded-xl sm:rounded-2xl md:rounded-3xl bg-black border border-white/20 shadow-xl shadow-black/30 transform -rotate-[7deg] hover:-rotate-[2deg] transition-all duration-300 flex items-center justify-center p-1.5 sm:p-2">
              <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-11 sm:h-11 md:w-15 md:h-15 lg:w-18 lg:h-18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 10V90H36V10H22Z" fill="#B81D24" />
                <path d="M64 10V90H78V10H64Z" fill="#B81D24" />
                <path d="M22 10L68 90H78L32 10H22Z" fill="#E50914" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicator Dots */}
      <div className="flex justify-center items-center gap-1.5 mt-3">
        <button
          onClick={() => setActiveSlide(0)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            activeSlide === 0 ? 'w-6 bg-[#4A3A85]' : 'w-2 bg-[#E7DFFB]'
          }`}
          aria-label="Slide 1"
        />
        <button
          onClick={() => setActiveSlide(1)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            activeSlide === 1 ? 'w-6 bg-[#4A3A85]' : 'w-2 bg-[#E7DFFB]'
          }`}
          aria-label="Slide 2"
        />
      </div>
    </div>
  );
};
