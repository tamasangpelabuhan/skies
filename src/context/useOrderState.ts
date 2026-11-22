'use client';

import { useState, useEffect } from 'react';
import { CustomerOrder } from '../types/order';
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

export function useOrderState() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skies_orders');
      setOrders(saved ? JSON.parse(saved) : INITIAL_ORDERS);
    } catch {
      setOrders([]);
    }

    if (isFirebaseConfigured) {
      const unsubscribe = subscribeOrdersFromFirestore((remoteOrders) => {
        setOrders(remoteOrders);
        try {
          localStorage.setItem('skies_orders', JSON.stringify(remoteOrders));
        } catch {}
      });
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('skies_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

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

    setOrders((prev) => [newOrder, ...prev]);
    const whatsappUrl = buildWhatsAppOrderUrl(newOrder, checkoutItems, settings);

    if (isFirebaseConfigured) {
      saveOrderToFirestore(newOrder).catch((e) => console.error('Save order to firestore error:', e));
    }

    return { order: newOrder, whatsappUrl };
  };

  const updateOrderStatus = async (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
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
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'Selesai',
              accountDetails: credentials,
            }
          : ord
      )
    );
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
