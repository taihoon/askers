import { firestore } from 'firebase/app';

export interface Post {
  id: string;
  userRef: firestore.DocumentReference;
  channelRef: firestore.DocumentReference;
  parentRef: firestore.DocumentReference;
  notice: boolean;
  contents: string;
  favoriteCount: number;
  favorites: firestore.DocumentReference[];
  created: firestore.Timestamp;
}

export type NewPost = Omit<Post, 'id' | 'created'> & { created: firestore.FieldValue };
