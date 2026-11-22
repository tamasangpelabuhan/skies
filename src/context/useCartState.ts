'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types/product';
import { CartItem } from '../types/cart';

export function useCartState(showToast: (msg: string) => void) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('skies_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('skies_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

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
