'use client';

import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const Testimonials: React.FC = () => {
  const { settings } = useStore();

  return (
    <section className="py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold font-heading text-[#4A3A85] tracking-tight">
            Kata pelanggan
          </h2>
          <p className="hidden sm:block text-xs text-[#7B6FA3] font-semibold mt-0.5">
            Ulasan asli dari pembeli terverifikasi di {settings.name}
          </p>
        </div>
        <span className="text-xs font-bold text-[#7B6FA3] hover:text-[#4A3A85] inline-flex items-center gap-1 cursor-pointer transition-colors group">
          <span>Semua ulasan</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>

      {/* Overall Score Row */}
      <div className="flex items-center gap-4 mb-5 p-4 rounded-2xl bg-white border-[1.5px] border-[#E7DFFB] shadow-2xs max-w-sm">
        <span className="text-4xl md:text-5xl font-black font-heading text-[#4A3A85] tracking-tight">
          {(settings.overallRating ?? 4.9).toFixed(1)}
        </span>
        <div>
          <div className="flex items-center gap-1 text-[#F3B62E] mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#F3B62E] text-[#F3B62E]" />
            ))}
          </div>
          <span className="text-xs font-bold text-[#7B6FA3]">
            {settings.totalReviews ?? 128} ulasan pelanggan terverifikasi
          </span>
        </div>
      </div>

      {/* Responsive Testimonials: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-[22px] md:rounded-[26px] p-4 md:p-5 border-[1.5px] border-[#E7DFFB] shadow-2xs flex flex-col justify-between"
          >
            <div>
              {/* Reviewer Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-bold font-heading text-[#2F2552]">
                  {review.name}
                </span>
                <div className="flex items-center gap-0.5 text-[#F3B62E]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F3B62E] text-[#F3B62E]" />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <p className="text-xs md:text-sm text-[#2F2552]/80 leading-relaxed font-normal">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>

            {/* Verified Product Badge */}
            <div className="mt-3 pt-2.5 border-t border-[#E7DFFB]/60 flex items-center justify-between text-[11px] text-[#7B6FA3] font-semibold">
              <span>{review.productName} • Pembelian terverifikasi</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
