import { firestore } from 'firebase/app';

export interface Channel {
  id: string;
  userRef: firestore.DocumentReference;
  code: string;
  title: string;
  desc: string;
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  created: firestore.Timestamp;
}

export type NewChannel = Omit<Channel, 'id' | 'created'> & { created: firestore.FieldValue };

