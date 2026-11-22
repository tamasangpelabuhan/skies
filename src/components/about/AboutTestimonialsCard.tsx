'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { TESTIMONIALS } from '../../data/testimonials';
import { Card } from '../ui/card';

export const AboutTestimonialsCard: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-bold text-zinc-950 tracking-tight">
          Kenapa belanja di sini?
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Kenali toko lewat pengalaman pelanggan yang sudah berbelanja.
        </p>
      </div>

      {/* Rating Summary */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-black text-zinc-950">
          {(settings.overallRating ?? 4.9).toFixed(1)}
        </span>
        <div>
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">
            {settings.totalReviews ?? 128} ulasan pelanggan
          </span>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="space-y-2.5">
        {TESTIMONIALS.slice(0, 2).map((review) => (
          <Card
            key={review.id}
            className="rounded-2xl p-4 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900">{review.name}</span>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed italic">
              &ldquo;{review.comment}&rdquo;
            </p>
            <span className="text-[10px] text-zinc-400 block pt-1">
              {review.productName} • Pembelian terverifikasi
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};
