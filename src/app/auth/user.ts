import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface User {
  uid?: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface UserInfo {
  uid: string;
  authenticated: boolean;
  displayName: string;
  photoURL: string;
  ref?: firebase.firestore.DocumentReference;
}
