import {
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { ProductReview } from '../../types/review';

const REVIEWS_COLLECTION = 'reviews';

export async function fetchReviewsFromFirestore(): Promise<ProductReview[]> {
  if (!db || !isFirebaseConfigured) return [];
  try {
    const q = query(collection(db, REVIEWS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ProductReview));
  } catch (err) {
    console.error('Failed to fetch reviews from Firestore:', err);
    return [];
  }
}

export async function saveReviewToFirestore(review: ProductReview): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, REVIEWS_COLLECTION, review.id);
  await setDoc(docRef, review, { merge: true });
}

export function subscribeReviewsFromFirestore(
  onUpdate: (reviews: ProductReview[]) => void
): Unsubscribe | null {
  if (!db || !isFirebaseConfigured) return null;
  const q = query(collection(db, REVIEWS_COLLECTION));
  return onSnapshot(
    q,
    (snapshot) => {
      const reviews = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ProductReview));
      onUpdate(reviews);
    },
    (err) => {
      console.warn('Reviews Firestore subscription notice:', err.message);
    }
  );
}
