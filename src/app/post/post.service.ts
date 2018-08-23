import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserInfo } from '../auth/user';
import { Post } from './post';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private collection: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService) {
    this.collection = this.afs.collection('posts');
  }

  savePost(post: Post) {
    return this.collection.add(post);
  }

  updatePost(post: Post) {
    const id = post.id;
    delete post.id;
    return this.collection.doc(id).update(post);
  }

  getPostById(postId: string): Observable<Post> {
    return this.collection.doc(postId).snapshotChanges().pipe(
      map(snapshot => ({
        id: snapshot.payload.id,
        ...snapshot.payload.data()
      } as Post))
    );
  }

  getPostByChannelId(channelId: string): Observable<Post[]> {
    // TODO https://github.com/angular/angularfire2/issues/1490
    return this.afs.collection<Post>(
      'posts',
      ref => ref.where('channel', '==', channelId).orderBy('created', 'desc')
    ).snapshotChanges().pipe(
      map(posts => {
        return posts.map(post => {
          return {
            id: post.payload.doc.id,
            ...post.payload.doc.data()
          };
        });
      })
    );
  }

  deletePost(post: Post) {
    return this.collection.doc(post.id).delete();
  }

  getNewPost(channelId: string): Observable<Post> {
    return this.authService.currentUserInfo.pipe(
      map(user => {
        return this.authService.getAttechedUserRef(user);
      }),
      switchMap(user => {
        return of({
          user: user,
          channel: channelId,
          contents: '',
          images: [],
          favoriteCount: 0,
          favorites: [],
          created: firestore.FieldValue.serverTimestamp()
        } as Post);
      })
    );
  }

  toggleFavorite(postId, favorites) {
    return this.collection.doc(postId).update({
      favoriteCount: favorites.length,
      favorites
    });
  }
}
