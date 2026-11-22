'use client';

import { useState, useEffect } from 'react';

export function useWishlistState(showToast: (msg: string) => void) {
  const [wishlist, setWishlist] = useState<string[]>(['netflix']);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('skies_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('skies_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

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
