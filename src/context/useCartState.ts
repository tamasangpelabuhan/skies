'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types/product';
import { CartItem } from '../types/cart';
import {
  getPersistentData,
  setPersistentData,
  STORAGE_KEYS,
} from '../lib/client-storage';

export function useCartState(showToast: (msg: string) => void) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial Load dari LocalStorage & Cookies
  useEffect(() => {
    try {
      const saved = getPersistentData<CartItem[]>(STORAGE_KEYS.CART, []);
      if (Array.isArray(saved) && saved.length > 0) {
        setCart(saved);
      }
    } catch (e) {
      console.warn('Error loading cart from storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Simpan setiap kali cart berubah, hanya setelah inisialisasi selesai
  useEffect(() => {
    if (!isLoaded) return;
    try {
      setPersistentData(STORAGE_KEYS.CART, cart);
    } catch (e) {
      console.warn('Error saving cart to storage:', e);
    }
  }, [cart, isLoaded]);

  // 3. Sinkronisasi multi-tab browser
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.CART && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setCart(parsed);
          }
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.variant.id === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, variant, quantity }];
    });
    showToast(`"${product.name} (${variant.duration})" masuk keranjang`);
  };

  const removeFromCart = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  const updateCartQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.variant.id === variantId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.variant.price * item.quantity, 0);

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };
}
