'use client';

/**
 * Client Storage Utility
 * Menyimpan data ganda ke localStorage dan Cookies (Google/Browser Storage)
 * sehingga pesanan, keranjang belanja, wishlist, dan profil pembeli
 * tetap tersimpan aman meskipun halaman di-refresh, browser ditutup, atau di-reload.
 */

export const STORAGE_KEYS = {
  CART: 'skies_cart',
  ORDERS: 'skies_orders',
  CUSTOMER_ORDERS: 'skies_customer_orders',
  CHECKOUT_ITEMS: 'skies_checkout_items',
  CUSTOMER_PROFILE: 'skies_customer_profile',
  WISHLIST: 'skies_wishlist',
  PRODUCTS: 'skies_products',
  REVIEWS: 'skies_reviews',
} as const;

export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === 'undefined') return;
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (err) {
    console.warn(`[Storage] Failed to set cookie ${name}:`, err);
  }
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
  } catch (err) {
    console.warn(`[Storage] Failed to get cookie ${name}:`, err);
  }
  return null;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}

/**
 * Menyimpan data ke localStorage DAN Cookie sekaligus (dual redundancy)
 */
export function setPersistentData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  const jsonString = JSON.stringify(data);

  // 1. Simpan ke LocalStorage
  try {
    localStorage.setItem(key, jsonString);
  } catch (err) {
    console.warn(`[Storage] LocalStorage setItem error for ${key}:`, err);
  }

  // 2. Simpan juga ke Cookie (browser cache) jika ukurannya wajar (< 3.8KB untuk cookie)
  try {
    if (jsonString.length < 3800) {
      setCookie(key, jsonString, 365);
    }
  } catch (err) {
    console.warn(`[Storage] Cookie set error for ${key}:`, err);
  }
}

/**
 * Mengambil data dari localStorage. Jika kosong, fallback otomatis cek Cookie.
 */
export function getPersistentData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  // 1. Coba baca dari localStorage
  try {
    const localVal = localStorage.getItem(key);
    if (localVal) {
      const parsed = JSON.parse(localVal);
      if (parsed !== undefined && parsed !== null) {
        return parsed as T;
      }
    }
  } catch (err) {
    console.warn(`[Storage] LocalStorage read failed for ${key}:`, err);
  }

  // 2. Fallback: Coba baca dari Cookie browser
  try {
    const cookieVal = getCookie(key);
    if (cookieVal) {
      const parsed = JSON.parse(cookieVal);
      if (parsed !== undefined && parsed !== null) {
        // Pulihkan juga ke localStorage
        try {
          localStorage.setItem(key, cookieVal);
        } catch {}
        return parsed as T;
      }
    }
  } catch (err) {
    console.warn(`[Storage] Cookie read failed for ${key}:`, err);
  }

  return fallback;
}

export function removePersistentData(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {}
  try {
    deleteCookie(key);
  } catch {}
}
