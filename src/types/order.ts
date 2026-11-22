export type OrderStatus = 'Belum dibayar' | 'Diproses' | 'Selesai';

export interface OrderItem {
  productName: string;
  variantName: string;
  duration: string;
  price: number;
  quantity: number;
  logoType?: string;
}

export interface CustomerOrder {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  customerName: string;
  customerWhatsapp: string;
  customerEmail?: string;
  customerNotes?: string;
  paymentMethod: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  warrantyUntil: string;
  accountDetails?: {
    email?: string;
    password?: string;
    profileName?: string;
    pin?: string;
    message?: string;
  };
}
