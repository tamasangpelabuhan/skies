'use client';

import { useState, useEffect } from 'react';
import { Category, CATEGORIES } from '../data/categories';
import {
  isFirebaseConfigured,
  saveCategoryToFirestore,
  deleteCategoryFromFirestore,
  subscribeCategoriesFromFirestore,
} from '../lib/firebase';

export function useCategoryState(showToast: (msg: string) => void) {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skies_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      }
    } catch {}

    if (isFirebaseConfigured) {
      const unsubscribe = subscribeCategoriesFromFirestore((remoteCats) => {
        if (remoteCats.length > 0) {
          const hasAll = remoteCats.some((c) => c.id === 'all');
          const merged = hasAll ? remoteCats : [CATEGORIES[0], ...remoteCats];
          setCategories(merged);
          try {
            localStorage.setItem('skies_categories', JSON.stringify(merged));
          } catch {}
        }
      });
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('skies_categories', JSON.stringify(categories));
    } catch {}
  }, [categories]);

  const addCategory = async (label: string) => {
    const cleanLabel = label.trim();
    if (!cleanLabel) return;
    const id = cleanLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (categories.some((c) => c.id === id)) {
      showToast('Kategori sudah ada');
      return;
    }

    const newCategory: Category = {
      id,
      label: cleanLabel,
      sectionTitle: cleanLabel,
    };

    setCategories((prev) => [...prev, newCategory]);
    showToast(`Kategori "${cleanLabel}" berhasil ditambahkan`);

    if (isFirebaseConfigured) {
      try {
        await saveCategoryToFirestore(newCategory);
      } catch (e) {
        console.error('Firebase save category error:', e);
      }
    }
  };

  const deleteCategory = async (catId: string) => {
    if (catId === 'all') {
      showToast('Kategori utama tidak dapat dihapus');
      return;
    }
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Kategori berhasil dihapus');

    if (isFirebaseConfigured) {
      try {
        await deleteCategoryFromFirestore(catId);
      } catch (e) {
        console.error('Firebase delete category error:', e);
      }
    }
  };

  return {
    categories,
    addCategory,
    deleteCategory,
  };
}
