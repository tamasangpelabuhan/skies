'use client';

import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';
import {
  isFirebaseConfigured,
  saveProductToFirestore,
  deleteProductFromFirestore,
  subscribeProductsFromFirestore,
} from '../lib/firebase';
import {
  getPersistentData,
  setPersistentData,
  STORAGE_KEYS,
} from '../lib/client-storage';

export function useProductState(showToast: (msg: string) => void) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Initial Load from Persistent Storage (Local Storage & Cookies)
    try {
      const saved = getPersistentData<Product[]>(STORAGE_KEYS.PRODUCTS, []);
      if (Array.isArray(saved) && saved.length > 0) {
        setProducts(saved);
        setIsProductsLoading(false);
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }

    // 2. Firebase Firestore Real-Time Sync
    if (isFirebaseConfigured) {
      const unsubscribe = subscribeProductsFromFirestore((remoteProducts) => {
        if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
          setProducts(remoteProducts);
          setPersistentData(STORAGE_KEYS.PRODUCTS, remoteProducts);
        } else {
          // If Firestore returns empty (first time running), fallback to default catalog products
          setProducts((current) => {
            if (current.length === 0) {
              setPersistentData(STORAGE_KEYS.PRODUCTS, PRODUCTS);
              return PRODUCTS;
            }
            return current;
          });
        }
        setIsProductsLoading(false);
      });
      return () => {
        if (unsubscribe) unsubscribe();
      };
    } else {
      // If Firebase is not configured, load default catalog
      setProducts((current) => (current.length === 0 ? PRODUCTS : current));
      setIsProductsLoading(false);
    }
  }, []);

  // 3. Simpan perubahan hanya setelah load pertama selesai
  useEffect(() => {
    if (!isLoaded || products.length === 0) return;
    try {
      setPersistentData(STORAGE_KEYS.PRODUCTS, products);
    } catch (e) {
      console.warn('Error saving products to persistent storage:', e);
    }
  }, [products, isLoaded]);

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
    isProductsLoading,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
