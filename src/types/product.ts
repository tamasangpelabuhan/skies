export type CategoryId = 'all' | 'streaming' | 'education' | 'music' | 'other' | 'favorites' | string;

export interface ProductVariant {
  id: string;
  name: string;
  duration: string;
  type: 'Sharing' | 'Private' | 'Invite Team' | 'Family Plan';
  price: number;
  originalPrice?: number;
  description: string;
  isBestSeller?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  themeColor: string;
  bgGradient: string;
  logoType: string;
  warrantyDays: number;
  rules: string[];
  variants: ProductVariant[];
}
