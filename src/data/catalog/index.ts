import { Product } from '../../types/product';
import { STREAMING_PRODUCTS } from './streaming';
import { EDUCATION_PRODUCTS } from './education';
import { MUSIC_PRODUCTS } from './music';
import { OTHER_PRODUCTS } from './other';

export const PRODUCTS: Product[] = [
  ...STREAMING_PRODUCTS,
  ...EDUCATION_PRODUCTS,
  ...MUSIC_PRODUCTS,
  ...OTHER_PRODUCTS,
];

export {
  STREAMING_PRODUCTS,
  EDUCATION_PRODUCTS,
  MUSIC_PRODUCTS,
  OTHER_PRODUCTS,
};
