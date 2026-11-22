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
import { Category } from '../../data/categories';

const CATEGORIES_COLLECTION = 'categories';

export async function fetchCategoriesFromFirestore(): Promise<Category[]> {
  if (!db || !isFirebaseConfigured) return [];
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('label', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
  } catch (err) {
    console.error('Failed to fetch categories from Firestore:', err);
    return [];
  }
}

export async function saveCategoryToFirestore(category: Category): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, CATEGORIES_COLLECTION, category.id);
  await setDoc(docRef, category, { merge: true });
}

export async function deleteCategoryFromFirestore(categoryId: string): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
  await deleteDoc(docRef);
}

export function subscribeCategoriesFromFirestore(
  onUpdate: (categories: Category[]) => void
): Unsubscribe | null {
  if (!db || !isFirebaseConfigured) return null;
  const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('label', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const cats = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
      onUpdate(cats);
    },
    (err) => {
      console.error('Categories listener error:', err);
    }
  );
}
