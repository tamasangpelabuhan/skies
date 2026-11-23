'use client';

import { useState, useEffect } from 'react';
import { CustomerOrder, OrderStatus } from '../types/order';
import { CartItem, CheckoutCustomerData } from '../types/cart';
import { StoreSettings } from '../types/settings';
import { INITIAL_ORDERS } from '../data/orders';
import {
  generateInvoiceNumber,
  formatCurrentDate,
  formatWarrantyExpiry,
  buildWhatsAppOrderUrl,
} from '../lib/order-utils';
import {
  isFirebaseConfigured,
  saveOrderToFirestore,
  updateOrderStatusInFirestore,
  updateOrderCredentialsInFirestore,
  subscribeOrdersFromFirestore,
} from '../lib/firebase';
import {
  getPersistentData,
  setPersistentData,
  STORAGE_KEYS,
} from '../lib/client-storage';

export function useOrderState() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial Load dari LocalStorage & Cookies
  useEffect(() => {
    try {
      const saved = getPersistentData<CustomerOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      setOrders(Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_ORDERS);
    } catch {
      setOrders(INITIAL_ORDERS);
    } finally {
      setIsLoaded(true);
    }

    // 2. Real-time Firebase Sync (jika Firebase aktif)
    if (isFirebaseConfigured) {
      const unsubscribe = subscribeOrdersFromFirestore((remoteOrders) => {
        if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
          setOrders(remoteOrders);
          setPersistentData(STORAGE_KEYS.ORDERS, remoteOrders);
        }
      });
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  // 3. Simpan setiap ada perubahan orders, HANYA setelah inisialisasi selesai
  useEffect(() => {
    if (!isLoaded || orders.length === 0) return;
    try {
      setPersistentData(STORAGE_KEYS.ORDERS, orders);
    } catch (e) {
      console.warn('Error saving orders to persistent storage:', e);
    }
  }, [orders, isLoaded]);

  const createOrder = (
    checkoutItems: CartItem[],
    customerData: CheckoutCustomerData,
    settings?: StoreSettings
  ) => {
    const invoiceNumber = generateInvoiceNumber();
    const formattedDate = formatCurrentDate();
    const formattedWarranty = formatWarrantyExpiry(30);

    const totalAmount = checkoutItems.reduce(
      (sum, item) => sum + item.variant.price * item.quantity,
      0
    );

    const newOrder: CustomerOrder = {
      id: `ord_${Date.now()}`,
      invoiceNumber,
      createdAt: formattedDate,
      customerName: customerData.name,
      customerWhatsapp: customerData.whatsapp,
      customerEmail: customerData.email,
      customerNotes: customerData.notes,
      paymentMethod: customerData.paymentMethod,
      items: checkoutItems.map((item) => ({
        productName: item.product.name,
        variantName: item.variant.name,
        duration: item.variant.duration,
        price: item.variant.price,
        quantity: item.quantity,
        logoType: item.product.logoType,
      })),
      totalAmount,
      status: 'Belum dibayar',
      warrantyUntil: formattedWarranty,
      accountDetails: {
        message: 'Selesaikan pembayaran untuk diproses.',
      },
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      // Simpan langsung secara instan ke browser storage & cookies
      setPersistentData(STORAGE_KEYS.ORDERS, updated);

      // Simpan juga ke daftar pesanan khusus browser pelanggan ini
      const myOrders = getPersistentData<CustomerOrder[]>(STORAGE_KEYS.CUSTOMER_ORDERS, []);
      setPersistentData(STORAGE_KEYS.CUSTOMER_ORDERS, [newOrder, ...myOrders]);

      return updated;
    });

    // Simpan profil pembeli agar checkout berikutnya tidak perlu mengetik ulang
    setPersistentData(STORAGE_KEYS.CUSTOMER_PROFILE, {
      name: customerData.name,
      whatsapp: customerData.whatsapp,
      email: customerData.email,
    });

    const whatsappUrl = buildWhatsAppOrderUrl(newOrder, checkoutItems, settings);

    if (isFirebaseConfigured) {
      saveOrderToFirestore(newOrder).catch((e) =>
        console.error('Save order to firestore error:', e)
      );
    }

    return { order: newOrder, whatsappUrl };
  };

  const updateOrderStatus = async (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) => {
      const updated: CustomerOrder[] = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status } : ord
      );
      setPersistentData(STORAGE_KEYS.ORDERS, updated);
      return updated;
    });
    if (isFirebaseConfigured) {
      try {
        await updateOrderStatusInFirestore(orderId, status);
      } catch (e) {
        console.error('Update order status error:', e);
      }
    }
  };

  const updateOrderCredentials = async (
    orderId: string,
    credentials: NonNullable<CustomerOrder['accountDetails']>
  ) => {
    setOrders((prev) => {
      const updated: CustomerOrder[] = prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'Selesai' as OrderStatus,
              accountDetails: credentials,
            }
          : ord
      );
      setPersistentData(STORAGE_KEYS.ORDERS, updated);
      return updated;
    });
    if (isFirebaseConfigured) {
      try {
        await updateOrderCredentialsInFirestore(orderId, credentials);
      } catch (e) {
        console.error('Update order credentials error:', e);
      }
    }
  };

  return {
    orders,
    setOrders,
    createOrder,
    updateOrderStatus,
    updateOrderCredentials,
  };
}
