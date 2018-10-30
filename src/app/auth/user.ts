import { firestore } from 'firebase';

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
  ref?: firestore.DocumentReference;
}
