'use client';

import React, { createContext, useContext, useState } from 'react';
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
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const { products, addProduct, updateProduct, deleteProduct } = useProductState(showToast);
  const { categories, addCategory, deleteCategory } = useCategoryState(showToast);
  const { wishlist, toggleWishlist, isWishlisted } = useWishlistState(showToast);
  const { cart, addToCart, removeFromCart, updateCartQuantity, clearCart, cartCount, cartTotal } = useCartState(showToast);
  const { orders, createOrder, updateOrderStatus, updateOrderCredentials } = useOrderState();
  const { settings, updateSettings } = useSettingsState(showToast);

  const initiateSingleCheckout = (product: Product, variant: ProductVariant, quantity = 1) => {
    setCheckoutItems([{ product, variant, quantity }]);
    setSelectedProduct(null);
    setIsCheckoutModalOpen(true);
  };

  const initiateCartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutItems([...cart]);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const completeOrder = (customerData: CheckoutCustomerData) => {
    const result = createOrder(checkoutItems, customerData, settings);
    if (checkoutItems.length === cart.length) {
      clearCart();
    }
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
