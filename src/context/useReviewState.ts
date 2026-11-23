'use client';

import { useState, useEffect, useMemo } from 'react';
import { ProductReview } from '../types/review';
import { Product } from '../types/product';
import { BASE_REVIEWS, ensureProductReviews } from '../data/initial-reviews';
import { maskCustomerName, filterProfanity } from '../lib/review-utils';
import { formatCurrentDate } from '../lib/order-utils';
import {
  isFirebaseConfigured,
  saveReviewToFirestore,
  subscribeReviewsFromFirestore,
} from '../lib/firebase';
import {
  getPersistentData,
  setPersistentData,
  STORAGE_KEYS,
} from '../lib/client-storage';

export function useReviewState(
  products: Product[],
  updateProductRating?: (productId: string, newRating: number, newCount: number) => void,
  showToast?: (msg: string) => void
) {
  const [reviews, setReviews] = useState<ProductReview[]>(BASE_REVIEWS);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial Load dari Persistent Storage (LocalStorage + Cookies)
  useEffect(() => {
    try {
      const saved = getPersistentData<ProductReview[]>(STORAGE_KEYS.REVIEWS, []);
      if (Array.isArray(saved) && saved.length > 0) {
        setReviews(saved);
      } else {
        const initial = ensureProductReviews(products, BASE_REVIEWS);
        setReviews(initial);
        setPersistentData(STORAGE_KEYS.REVIEWS, initial);
      }
    } catch {
      setReviews(BASE_REVIEWS);
    } finally {
      setIsLoaded(true);
    }

    // 2. Real-time Firebase Firestore Sync
    if (isFirebaseConfigured) {
      const unsubscribe = subscribeReviewsFromFirestore((remoteReviews) => {
        if (Array.isArray(remoteReviews) && remoteReviews.length > 0) {
          setReviews((prev) => {
            // Gabungkan remote review dengan lokal
            const map = new Map<string, ProductReview>();
            [...prev, ...remoteReviews].forEach((r) => map.set(r.id, r));
            const merged = Array.from(map.values());
            setPersistentData(STORAGE_KEYS.REVIEWS, merged);
            return merged;
          });
        }
      });
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [products]);

  // 3. Pastikan setiap produk selalu memiliki ulasan dummy jika belum ada
  useEffect(() => {
    if (products.length > 0) {
      setReviews((prev) => {
        const enriched = ensureProductReviews(products, prev);
        if (enriched.length !== prev.length) {
          setPersistentData(STORAGE_KEYS.REVIEWS, enriched);
          return enriched;
        }
        return prev;
      });
    }
  }, [products]);

  // 4. Simpan ke storage saat ada ulasan baru
  useEffect(() => {
    if (!isLoaded || reviews.length === 0) return;
    try {
      setPersistentData(STORAGE_KEYS.REVIEWS, reviews);
    } catch {}
  }, [reviews, isLoaded]);

  // Fungsi Tambah Ulasan Baru
  const addReview = async (
    data: Omit<ProductReview, 'id' | 'createdAt'>
  ): Promise<ProductReview> => {
    const formattedDate = formatCurrentDate();
    const maskedName = maskCustomerName(data.customerName);
    const cleanedComment = filterProfanity(data.comment);

    const newReview: ProductReview = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      orderId: data.orderId,
      productId: data.productId,
      productName: data.productName,
      customerName: maskedName,
      rating: Math.min(5, Math.max(1, data.rating)),
      comment: cleanedComment,
      createdAt: formattedDate,
      verified: true,
    };

    setReviews((prev) => {
      const updated = [newReview, ...prev];
      setPersistentData(STORAGE_KEYS.REVIEWS, updated);
      return updated;
    });

    if (showToast) {
      showToast('Terima kasih! Ulasan Anda berhasil dikirim ⭐');
    }

    // Simpan ke Firestore
    if (isFirebaseConfigured) {
      saveReviewToFirestore(newReview).catch((err) =>
        console.error('Save review to firestore error:', err)
      );
    }

    return newReview;
  };

  // Helper: Ambil ulasan per produk
  const getProductReviews = (productId: string): ProductReview[] => {
    return reviews.filter(
      (r) =>
        r.productId === productId ||
        r.productId.toLowerCase() === productId.toLowerCase() ||
        r.productName.toLowerCase().includes(productId.toLowerCase())
    );
  };

  // Helper: Hitung rating rata-rata produk
  const getProductRating = (productId: string): { rating: number; count: number } => {
    const pReviews = getProductReviews(productId);
    if (pReviews.length === 0) return { rating: 4.9, count: 3 };
    const sum = pReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      rating: Number((sum / pReviews.length).toFixed(1)),
      count: pReviews.length,
    };
  };

  return {
    reviews,
    addReview,
    getProductReviews,
    getProductRating,
  };
}
