import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';

export function firebaseInit() {
  return initializeApp(firebaseConfig);
}
