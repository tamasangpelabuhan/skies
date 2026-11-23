'use client';

import React, { useState, useEffect } from 'react';
import { Star, X, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { maskCustomerName } from '../../lib/review-utils';
import { ProductReview } from '../../types/review';
import { CustomerOrder } from '../../types/order';
import { Product } from '../../types/product';
import {
  getPersistentData,
  STORAGE_KEYS,
} from '../../lib/client-storage';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: CustomerOrder | null;
  product?: Product | null;
  onSubmitReview: (data: Omit<ProductReview, 'id' | 'createdAt'>) => Promise<void>;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  order,
  product,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-restore customer profile on modal open
  useEffect(() => {
    if (isOpen) {
      if (order?.customerName) {
        setName(order.customerName);
      } else {
        const profile = getPersistentData<{ name?: string }>(
          STORAGE_KEYS.CUSTOMER_PROFILE,
          {}
        );
        if (profile?.name) setName(profile.name);
      }
      setRating(5);
      setComment('');
    }
  }, [isOpen, order]);

  if (!isOpen) return null;

  const targetProductId =
    product?.id ||
    product?.slug ||
    (order?.items[0]?.productName.toLowerCase().includes('spotify')
      ? 'spotify'
      : order?.items[0]?.productName.toLowerCase().includes('canva')
      ? 'canva'
      : order?.items[0]?.productName.toLowerCase().includes('youtube')
      ? 'youtube'
      : 'netflix');

  const targetProductName =
    product?.name || order?.items[0]?.productName || 'Aplikasi Premium';

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return 'Sangat Puas ⭐⭐⭐⭐⭐';
      case 4:
        return 'Puas ⭐⭐⭐⭐';
      case 3:
        return 'Cukup ⭐⭐⭐';
      case 2:
        return 'Kurang Puas ⭐⭐';
      case 1:
        return 'Kecewa ⭐';
      default:
        return 'Pilih Rating';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Mohon tuliskan sedikit ulasan atau pengalaman Anda.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitReview({
        orderId: order?.id,
        productId: targetProductId,
        productName: targetProductName,
        customerName: name.trim() || 'Pelanggan Setia',
        rating,
        comment: comment.trim(),
        verified: true,
      });
      onClose();
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewMasked = maskCustomerName(name || 'Nama Pelanggan');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-md bg-white rounded-3xl border-[1.5px] border-[#E7DFFB] shadow-2xl overflow-hidden p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DFFB]/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFF4CC] border border-[#FFE59A] flex items-center justify-center text-[#2F2552]">
              <Star className="w-4 h-4 fill-[#F3B62E] text-[#F3B62E]" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-[#4A3A85]">
                Beri Ulasan Produk
              </h2>
              <p className="text-[11px] text-[#7B6FA3] font-semibold truncate max-w-[230px]">
                {targetProductName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7B6FA3] hover:text-[#4A3A85] hover:bg-[#F5F1FF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Star Rating Picker */}
          <div className="text-center py-2 bg-[#F5F1FF]/60 rounded-2xl border border-[#E7DFFB] space-y-1.5">
            <span className="text-[11px] font-bold text-[#7B6FA3] block">
              Berapa bintang untuk pengalaman Anda?
            </span>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-125 active:scale-95 transition-all cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        active
                          ? 'fill-[#F3B62E] text-[#F3B62E] drop-shadow-xs'
                          : 'fill-transparent text-[#E7DFFB]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-extrabold text-[#4A3A85] block">
              {getRatingLabel(hoverRating || rating)}
            </span>
          </div>

          {/* Customer Name with Privacy Live Masking */}
          <div className="space-y-1">
            <label className="block text-[#2F2552] font-bold">
              Nama Anda
            </label>
            <Input
              type="text"
              placeholder="Contoh: Nadia Safira"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[1.5px] border-[#E7DFFB] focus-visible:ring-[#4A3A85] rounded-xl text-[#2F2552]"
            />
            <p className="text-[10px] text-[#7B6FA3] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
              <span>
                Nama Anda disensor demi privasi: <b className="text-[#4A3A85]">{previewMasked}</b>
              </span>
            </p>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-1">
            <label className="block text-[#2F2552] font-bold">
              Ulasan / Pengalaman Anda <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Ceritakan pengalaman Anda (misal: proses cepat 5 menit, akun langsung aktif, no screen limit)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-[#E7DFFB] focus:border-[#4A3A85] focus:ring-1 focus:ring-[#4A3A85] focus:outline-hidden text-xs text-[#2F2552] bg-white resize-none"
            />
            <p className="text-[10px] text-[#7B6FA3]">
              🛡️ Sensor kata-kata kasar aktif otomatis untuk kenyamanan bersama.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-white text-xs font-extrabold active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{isSubmitting ? 'Mengirim ulasan...' : 'Kirim Ulasan Sekarang'}</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
