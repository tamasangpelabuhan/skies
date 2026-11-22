import {
  Product,
  ProductVariant,
  CategoryId,
  CustomerOrder,
  CartItem,
  CheckoutCustomerData,
} from './index';
import { Category } from '../data/categories';
import { StoreSettings } from './settings';

export interface StoreContextType {
  activeTab: 'beranda' | 'katalog' | 'pesanan' | 'bantuan';
  setActiveTab: (tab: 'beranda' | 'katalog' | 'pesanan' | 'bantuan') => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updated: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  categories: Category[];
  addCategory: (label: string) => void;
  deleteCategory: (catId: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  orders: CustomerOrder[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  checkoutItems: CartItem[];
  initiateSingleCheckout: (product: Product, variant: ProductVariant, quantity?: number) => void;
  initiateCartCheckout: () => void;
  completeOrder: (customerData: CheckoutCustomerData) => {
    order: CustomerOrder;
    whatsappUrl: string;
  };
  updateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  updateOrderCredentials: (
    orderId: string,
    credentials: NonNullable<CustomerOrder['accountDetails']>
  ) => void;
  toastMessage: string | null;
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
}
