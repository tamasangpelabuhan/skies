const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDy-ikRSG6eNDoanW2u4mnFCX3vECuyu8A",
  authDomain: "skies-store.firebaseapp.com",
  projectId: "skies-store",
  storageBucket: "skies-store.firebasestorage.app",
  messagingSenderId: "491678120337",
  appId: "1:491678120337:web:c29dee2b248c0da8e48230",
  measurementId: "G-J06DJCQKDR"
};

async function testUnauthenticated() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  try {
    const testDoc = doc(db, 'products', 'hacker_prod');
    await setDoc(testDoc, { name: 'Unauthorized Product' });
    console.log('UNAUTHENTICATED_ALLOWED');
  } catch (err) {
    console.log('UNAUTHENTICATED_BLOCKED:', err.code);
  }
  process.exit(0);
}
testUnauthenticated();
