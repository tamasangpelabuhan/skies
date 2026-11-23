'use client';

import { useState, useEffect } from 'react';
import {
  getPersistentData,
  setPersistentData,
  STORAGE_KEYS,
} from '../lib/client-storage';

export function useWishlistState(showToast: (msg: string) => void) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = getPersistentData<string[]>(STORAGE_KEYS.WISHLIST, ['netflix']);
      setWishlist(Array.isArray(saved) ? saved : ['netflix']);
    } catch {
      setWishlist(['netflix']);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      setPersistentData(STORAGE_KEYS.WISHLIST, wishlist);
    } catch {}
  }, [wishlist, isLoaded]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit');
      return updated;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return {
    wishlist,
    toggleWishlist,
    isWishlisted,
  };
}
