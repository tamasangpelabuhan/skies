const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc, deleteDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDy-ikRSG6eNDoanW2u4mnFCX3vECuyu8A",
  authDomain: "skies-store.firebaseapp.com",
  projectId: "skies-store",
  storageBucket: "skies-store.firebasestorage.app",
  messagingSenderId: "491678120337",
  appId: "1:491678120337:web:c29dee2b248c0da8e48230",
  measurementId: "G-J06DJCQKDR"
};

async function testAuthAndFirestore() {
  console.log('--- 1. Initializing Firebase ---');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  console.log('\n--- 2. Authenticating as admin@skies.id ---');
  try {
    const cred = await signInWithEmailAndPassword(auth, 'admin@skies.id', 'skiesss');
    console.log('✅ SIGN IN SUCCESSFUL!');
    console.log('Admin Email:', cred.user.email);
    console.log('Admin UID:', cred.user.uid);

    console.log('\n--- 3. Testing Authenticated Write to categories ---');
    const testCatRef = doc(db, 'categories', 'test_category');
    await setDoc(testCatRef, {
      id: 'test_category',
      label: 'Testing Category',
      createdAt: new Date().toISOString()
    });
    console.log('✅ SUCCESS: Authenticated admin can WRITE to categories!');

    const snap = await getDoc(testCatRef);
    if (snap.exists()) {
      console.log('✅ SUCCESS: Read back category doc:', snap.data());
    }

    await deleteDoc(testCatRef);
    console.log('✅ SUCCESS: Cleaned up test category doc.');

  } catch (err) {
    console.error('❌ ERROR:', err.code, err.message);
  }

  process.exit(0);
}

testAuthAndFirestore();
