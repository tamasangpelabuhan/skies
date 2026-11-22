import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Unsubscribe,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

export async function loginWithFirebase(email: string, pass: string): Promise<User> {
  if (!auth || !isFirebaseConfigured) {
    throw new Error('Firebase Auth belum dikonfigurasi.');
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
}

export async function logoutWithFirebase(): Promise<void> {
  if (!auth || !isFirebaseConfigured) return;
  await signOut(auth);
}

export function subscribeAuth(callback: (user: User | null) => void): Unsubscribe | null {
  if (!auth || !isFirebaseConfigured) return null;
  return onAuthStateChanged(auth, callback);
}
