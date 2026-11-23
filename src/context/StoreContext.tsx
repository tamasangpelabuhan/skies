'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductVariant,
  CartItem,
  CategoryId,
  CheckoutCustomerData,
  StoreContextType,
} from '../types';
import { useCartState } from './useCartState';
import { useOrderState } from './useOrderState';
import { useProductState } from './useProductState';
import { useWishlistState } from './useWishlistState';
import { useCategoryState } from './useCategoryState';
import { useSettingsState } from './useSettingsState';
import { useReviewState } from './useReviewState';
import { CustomerOrder } from '../types/order';
import {
  getPersistentData,
  setPersistentData,
  removePersistentData,
  STORAGE_KEYS,
} from '../lib/client-storage';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'beranda' | 'katalog' | 'pesanan' | 'bantuan'>('beranda');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTargetOrder, setReviewTargetOrder] = useState<CustomerOrder | null>(null);
  const [reviewTargetProduct, setReviewTargetProduct] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore saved checkout items on mount (keeps items when refreshing /checkout)
  useEffect(() => {
    try {
      const savedCheckout = getPersistentData<CartItem[]>(STORAGE_KEYS.CHECKOUT_ITEMS, []);
      if (Array.isArray(savedCheckout) && savedCheckout.length > 0) {
        setCheckoutItems(savedCheckout);
      }
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const { products, isProductsLoading, addProduct, updateProduct, deleteProduct } = useProductState(showToast);
  const { categories, addCategory, deleteCategory } = useCategoryState(showToast);
  const { wishlist, toggleWishlist, isWishlisted } = useWishlistState(showToast);
  const { cart, addToCart, removeFromCart, updateCartQuantity, clearCart, cartCount, cartTotal } = useCartState(showToast);
  const { orders, createOrder, updateOrderStatus, updateOrderCredentials } = useOrderState();
  const { settings, updateSettings } = useSettingsState(showToast);
  const { reviews, addReview, getProductReviews, getProductRating } = useReviewState(products, undefined, showToast);

  const openReviewModalForOrder = (order: CustomerOrder) => {
    setReviewTargetOrder(order);
    setReviewTargetProduct(null);
    setIsReviewModalOpen(true);
  };

  const openReviewModalForProduct = (product: Product) => {
    setReviewTargetProduct(product);
    setReviewTargetOrder(null);
    setIsReviewModalOpen(true);
  };

  const initiateSingleCheckout = (product: Product, variant: ProductVariant, quantity = 1) => {
    const items = [{ product, variant, quantity }];
    setCheckoutItems(items);
    setPersistentData(STORAGE_KEYS.CHECKOUT_ITEMS, items);
    setSelectedProduct(null);
    setIsCheckoutModalOpen(true);
  };

  const initiateCartCheckout = () => {
    if (cart.length === 0) return;
    const items = [...cart];
    setCheckoutItems(items);
    setPersistentData(STORAGE_KEYS.CHECKOUT_ITEMS, items);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const completeOrder = (customerData: CheckoutCustomerData) => {
    const result = createOrder(checkoutItems, customerData, settings);
    if (checkoutItems.length === cart.length) {
      clearCart();
    }
    removePersistentData(STORAGE_KEYS.CHECKOUT_ITEMS);
    return result;
  };

  return (
    <StoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        products,
        isProductsLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        deleteCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        checkoutItems,
        initiateSingleCheckout,
        initiateCartCheckout,
        completeOrder,
        updateOrderStatus,
        updateOrderCredentials,
        toastMessage,
        settings,
        updateSettings,
        reviews,
        addReview,
        getProductReviews,
        getProductRating,
        isReviewModalOpen,
        setIsReviewModalOpen,
        reviewTargetOrder,
        setReviewTargetOrder,
        reviewTargetProduct,
        setReviewTargetProduct,
        openReviewModalForOrder,
        openReviewModalForProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
