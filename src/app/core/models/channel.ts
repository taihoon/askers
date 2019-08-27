import { firestore } from 'firebase/app';

export interface NewChannel {
  userRef: firestore.DocumentReference;
  code: string;
  title: string;
  desc: string;
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  created: firestore.FieldValue;
}

export interface Channel {
  id?: string;
  userRef: firestore.DocumentReference;
  code: string;
  title: string;
  desc: string;
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  created: firestore.Timestamp;
}
