export interface ProductReview {
  id: string;
  orderId?: string;
  productId: string;
  productName: string;
  customerName: string; // Already masked (e.g. Nadia S.***)
  rating: number; // 1-5
  comment: string; // Profanity filtered
  createdAt: string; // e.g. "23 Nov 2026"
  verified: boolean; // true for verified buyer
}
