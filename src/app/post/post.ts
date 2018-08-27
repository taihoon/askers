import { firestore } from 'firebase';
import { UserInfo } from '../auth/user';

export interface Post {
  id?: string;
  user: UserInfo;
  channelId: string;
  notice: boolean;
  contents: string;
  images: string[];
  favoriteCount: number;
  favorites: Array<UserInfo>;
  created: firestore.Timestamp | firestore.FieldValue;
}
