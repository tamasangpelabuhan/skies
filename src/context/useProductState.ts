'use client';

import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import {
  isFirebaseConfigured,
  saveProductToFirestore,
  deleteProductFromFirestore,
  subscribeProductsFromFirestore,
} from '../lib/firebase';

export function useProductState(showToast: (msg: string) => void) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skies_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    } catch {}

    if (isFirebaseConfigured) {
      const unsubscribe = subscribeProductsFromFirestore((remoteProducts) => {
        setProducts(remoteProducts);
        try {
          localStorage.setItem('skies_products', JSON.stringify(remoteProducts));
        } catch {}
      });
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('skies_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  const addProduct = async (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Produk "${newProduct.name}" berhasil ditambahkan`);
    if (isFirebaseConfigured) {
      try {
        await saveProductToFirestore(newProduct);
      } catch (e) {
        console.error('Firebase save product error:', e);
      }
    }
  };

  const updateProduct = async (productId: string, updated: Partial<Product>) => {
    const updatedList = products.map((p) => (p.id === productId ? { ...p, ...updated } : p));
    setProducts(updatedList);
    showToast('Produk berhasil diperbarui');
    if (isFirebaseConfigured) {
      const target = updatedList.find((p) => p.id === productId);
      if (target) {
        try {
          await saveProductToFirestore(target);
        } catch (e) {
          console.error('Firebase update product error:', e);
        }
      }
    }
  };

  const deleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Produk berhasil dihapus');
    if (isFirebaseConfigured) {
      try {
        await deleteProductFromFirestore(productId);
      } catch (e) {
        console.error('Firebase delete product error:', e);
      }
    }
  };

  return {
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
