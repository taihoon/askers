import { firestore } from 'firebase';
import { UserInfo } from '../auth/user';

export interface Channel {
  id?: string;
  userRef: UserInfo;
  code: string;
  title: string;
  desc: string;
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  created: firestore.Timestamp | firestore.FieldValue;
}
