import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { UserInfo } from '../auth/user';

export interface Channel {
  id?: string;
  userRef: UserInfo;
  code: string;
  title: string;
  desc: string;
  start: firebase.firestore.Timestamp;
  end: firebase.firestore.Timestamp;
  created: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
}

export interface UpdatedChannel {
  title: string;
  desc: string;
  start: firebase.firestore.Timestamp;
  end: firebase.firestore.Timestamp;
}
