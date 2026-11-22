import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { CustomerOrder } from '../../types/order';

const ORDERS_COLLECTION = 'orders';

export async function fetchOrdersFromFirestore(): Promise<CustomerOrder[]> {
  if (!db || !isFirebaseConfigured) return [];
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as CustomerOrder));
  } catch (err) {
    console.error('Failed to fetch orders from Firestore:', err);
    return [];
  }
}

export async function saveOrderToFirestore(order: CustomerOrder): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, ORDERS_COLLECTION, order.id);
  await setDoc(docRef, order, { merge: true });
}

export async function updateOrderStatusInFirestore(
  orderId: string,
  status: CustomerOrder['status']
): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(docRef, { status });
}

export async function updateOrderCredentialsInFirestore(
  orderId: string,
  credentials: NonNullable<CustomerOrder['accountDetails']>
): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(docRef, {
    status: 'Selesai',
    accountDetails: credentials,
  });
}

export function subscribeOrdersFromFirestore(
  onUpdate: (orders: CustomerOrder[]) => void
): Unsubscribe | null {
  if (!db || !isFirebaseConfigured) return null;
  const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as CustomerOrder));
      onUpdate(orders);
    },
    (err) => {
      console.error('Orders listener error:', err);
    }
  );
}
