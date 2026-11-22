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
      subtitle: 'Streaming, belajar, dan musik. Pilih yang paling kamu suka.',
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
    <div className="pt-2 pb-2 md:pb-4">
      <div className="relative overflow-hidden rounded-[26px] md:rounded-[32px] bg-[#B7A3F2] text-[#2F2552] p-6 md:p-8 lg:p-12 border border-[#E7DFFB] shadow-sm min-h-[195px] md:min-h-[270px] flex items-center">
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

        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          {/* Left Text Content */}
          <div className="max-w-[75%] md:max-w-[58%] lg:max-w-[52%] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] md:text-xs font-black tracking-wider text-[#4A3A85] bg-[#FFF4CC] border border-[#FFE59A] px-2.5 py-0.5 rounded-full uppercase">
                  {slides[activeSlide].badge}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/50 border border-white/60 text-[11px] font-bold text-[#2F2552]">
                  <Star className="w-3 h-3 fill-[#F3B62E] text-[#F3B62E]" />
                  <span>Rating 4.9/5</span>
                </span>
              </div>

              <h1 className="text-[22px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-heading leading-[1.12] text-[#2F2552] mt-2 md:mt-3 whitespace-pre-line tracking-tight">
                {slides[activeSlide].title}
              </h1>

              <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold leading-relaxed text-[#2F2552]/85 mt-2 md:mt-3 max-w-lg">
                {slides[activeSlide].subtitle}
              </p>

              {/* Badges on desktop */}
              <div className="hidden md:flex items-center gap-5 mt-4 text-xs lg:text-sm text-[#2F2552]/90 font-bold">
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
              className="mt-4 md:mt-6 self-start inline-flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3.5 rounded-full bg-[#4A3A85] text-[#F5F1FF] hover:bg-[#3d2f70] text-xs md:text-sm font-extrabold active:scale-95 transition-all shadow-md group"
            >
              <span>{slides[activeSlide].buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Visual Floating Cards */}
          <div className="relative w-[38%] md:w-[42%] lg:w-[45%] h-36 md:h-56 lg:h-64 flex items-center justify-end select-none shrink-0 self-center">
            {/* YouTube Card (left floating on desktop) */}
            <div className="hidden md:flex absolute top-3 left-4 lg:left-8 w-[95px] lg:w-[115px] h-[68px] lg:h-[78px] rounded-2xl bg-red-600 shadow-xl shadow-red-950/20 transform -rotate-[10deg] hover:-rotate-[4deg] transition-all duration-300 items-center justify-center p-2.5 border border-white/20">
              <div className="flex items-center gap-1.5 text-white">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="font-extrabold text-xs">YouTube</span>
              </div>
            </div>

            {/* Spotify Card (top right tilted) */}
            <div className="absolute top-0 right-1 md:right-8 lg:right-12 w-[100px] md:w-[140px] lg:w-[160px] h-[72px] md:h-[98px] lg:h-[108px] rounded-2xl md:rounded-3xl bg-[#1DB954] shadow-xl shadow-emerald-950/20 transform rotate-[8deg] hover:rotate-[4deg] transition-all duration-300 p-2 md:p-3 flex flex-col justify-center items-center border border-white/30">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-8 md:h-8 fill-black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.792-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.809-.87 7.076-.496 9.721 1.115.295.18.387.563.207.855zm1.225-2.724c-.226.368-.71.485-1.077.26-2.69-1.653-6.79-2.133-9.97-1.168-.413.125-.853-.112-.978-.525-.125-.413.112-.853.525-.978 3.633-1.103 8.147-.568 11.24 1.334.367.226.484.71.26 1.077zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.129-1.168-.623-.15-.495.13-1.019.624-1.169 3.532-1.072 9.404-.866 13.115 1.338.445.264.59.842.327 1.287-.264.446-.843.59-1.278.322z" />
                </svg>
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-[10px] md:text-sm lg:text-base font-black text-black leading-tight">Spotify</span>
                  <span className="text-[8px] md:text-xs font-bold text-black/80">Premium</span>
                </div>
              </div>
            </div>

            {/* Netflix Card (bottom right tilted) */}
            <div className="absolute bottom-1 md:bottom-2 right-4 md:right-24 lg:right-32 w-[85px] md:w-[120px] lg:w-[135px] h-[85px] md:h-[120px] lg:h-[135px] rounded-2xl md:rounded-3xl bg-black border border-white/20 shadow-2xl shadow-black/30 transform -rotate-[6deg] hover:-rotate-[2deg] transition-all duration-300 flex items-center justify-center p-2">
              <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
