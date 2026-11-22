import { Product, ProductVariant } from './product';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface CheckoutCustomerData {
  name: string;
  whatsapp: string;
  email?: string;
  notes?: string;
  paymentMethod: string;
}
