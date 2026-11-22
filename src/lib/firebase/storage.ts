import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

export async function uploadImageToFirebaseStorage(
  file: File | Blob,
  fileName?: string
): Promise<string> {
  if (!storage || !isFirebaseConfigured) {
    throw new Error('Firebase Storage belum dikonfigurasi.');
  }

  const name = fileName || `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const storageRef = ref(storage, `products/${name}`);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}
