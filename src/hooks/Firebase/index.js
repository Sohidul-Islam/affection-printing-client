import { firebaseConfig } from './firebase.config';
import { initializeApp } from "firebase/app";

export function firebaseInit() {
 return initializeApp(firebaseConfig)
}