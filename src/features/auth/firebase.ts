import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC06Djf-vDjmir1KA04M2ogYuvZmwYXyRk',
  authDomain: 'git-notes-5a4ca.firebaseapp.com',
  projectId: 'git-notes-5a4ca',
  storageBucket: 'git-notes-5a4ca.firebasestorage.app',
  messagingSenderId: '958120305013',
  appId: '1:958120305013:web:44c393861e5a57e25cb33c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();
githubProvider.addScope('gist');

export { auth, githubProvider, signOut };
