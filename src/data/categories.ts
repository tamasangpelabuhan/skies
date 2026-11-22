import { CategoryId } from '../types/product';

export interface Category {
  id: CategoryId;
  label: string;
  sectionTitle?: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Semua produk' },
];
