import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { StoreSettings } from '../../types/settings';
import { STORE_INFO } from '../../data/store-info';

const SETTINGS_DOC_ID = 'store_config';

export const DEFAULT_SETTINGS: StoreSettings = {
  name: STORE_INFO.name,
  sinceYear: STORE_INFO.sinceYear,
  status: 'Buka / Online',
  tagline: STORE_INFO.tagline,
  whatsappNumber: STORE_INFO.whatsappNumber,
  whatsappDisplay: STORE_INFO.whatsappDisplay,
  operationalHours: '10.00-22.00 WIB',
  instagram: STORE_INFO.instagram,
  overallRating: STORE_INFO.overallRating,
  totalReviews: STORE_INFO.totalReviews,
};

export async function fetchStoreSettingsFromFirestore(): Promise<StoreSettings> {
  if (!db || !isFirebaseConfigured) return DEFAULT_SETTINGS;
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as StoreSettings;
    }
    await setDoc(docRef, DEFAULT_SETTINGS, { merge: true });
    return DEFAULT_SETTINGS;
  } catch (err) {
    console.error('Failed to fetch settings from Firestore:', err);
    return DEFAULT_SETTINGS;
  }
}

export async function saveStoreSettingsToFirestore(settings: StoreSettings): Promise<void> {
  if (!db || !isFirebaseConfigured) return;
  const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
  await setDoc(docRef, settings, { merge: true });
}

export function subscribeStoreSettingsFromFirestore(
  onUpdate: (settings: StoreSettings) => void
): Unsubscribe | null {
  if (!db || !isFirebaseConfigured) return null;
  const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as StoreSettings);
      }
    },
    (err) => {
      console.error('Settings listener error:', err);
    }
  );
}
