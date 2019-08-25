import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { UserInfo } from '../auth/user';

export interface Post {
  id?: string;
  user: UserInfo;
  channel: string;
  parent: null | string;
  notice: boolean;
  contents: string;
  images: string[];
  favoriteCount: number;
  favorites: Array<UserInfo>;
  created: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
}

export interface NewPost {
  channel: string;
  parent: null | string;
  contents: string;
}

export interface UpdatedPost {
  contents: string;
}

export interface PostWithReplies {
  post: Post;
  replies: Post[];
}
