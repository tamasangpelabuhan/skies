import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { Product } from '../../types/product';

const PRODUCTS_COLLECTION = 'products';

export async function fetchProductsFromFirestore(): Promise<Product[]> {
  if (!db || !isFirebaseConfigured) return [];
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  } catch (err) {
    console.error('Failed to fetch products from Firestore:', err);
    return [];
  }
}

export async function saveProductToFirestore(product: Product): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
  await setDoc(docRef, product, { merge: true });
}

export async function deleteProductFromFirestore(productId: string): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  await deleteDoc(docRef);
}

export function subscribeProductsFromFirestore(
  onUpdate: (products: Product[]) => void
): Unsubscribe | null {
  if (!db || !isFirebaseConfigured) return null;
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('name', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const prods = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
      onUpdate(prods);
    },
    (err) => {
      console.error('Products listener error:', err);
    }
  );
}
