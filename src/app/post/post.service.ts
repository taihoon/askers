import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Post, NewPost, UpdatedPost, PostWithReplies } from './post';
import { AuthService } from '../auth/auth.service';
import { groupBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private collection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.collection = this.afs.collection('posts');
  }

  savePost(post: NewPost) {
    return this.authService.currentUserInfo.pipe(
      map(userInfo => this.authService.getAttechedUserRef(userInfo)),
      map(userInfo => ({
        user: userInfo,
        channel: post.channel,
        parent: post.parent,
        notice: false,
        contents: post.contents,
        images: [],
        favoriteCount: 0,
        favorites: [],
        created: firebase.firestore.FieldValue.serverTimestamp()
      })),
      // tap(_ => console.log("save post", _)),
      switchMap(newPost => this.collection.add(newPost))
    );
  }

  updatePost(id: string, updatedPost: UpdatedPost) {
    return of(this.collection.doc(id).update(updatedPost));
  }

  getPostById(postId: string): Observable<Post> {
    return this.collection
      .doc(postId)
      .snapshotChanges()
      .pipe(
        map(
          snapshot =>
            ({
              id: snapshot.payload.id,
              ...snapshot.payload.data()
            } as Post)
        )
      );
  }

  getPostWithRepliesByChannelId(
    channelId: string,
    orderBy: string
  ): Observable<PostWithReplies[]> {
    return this.afs
      .collection<Post>('posts', ref => {
        let query = ref
          .where('channel', '==', channelId)
          .orderBy('notice', 'desc');
        if (orderBy !== 'created') {
          query = query.orderBy(orderBy, 'desc');
        }
        return query
          .orderBy('created', 'desc');
      })
      .snapshotChanges()
      .pipe(
        map(origins => (
          origins.map(origin => ({
            id: origin.payload.doc.id,
            ...origin.payload.doc.data()
          }))
        )),
        map(origins => {
          const posts = origins.filter(post => !post.parent);
          const replies = origins.filter(post => !!post.parent);
          const groupByParentReplies = groupBy(replies, 'parent');
          return posts.map(post => ({
            post: post,
            replies: groupByParentReplies[post.id]
          }));
        })
      );
  }

  deletePost(postId) {
    return this.collection.doc(postId).delete();
  }

  getNewPost(channelId: string): Observable<Post> {
    //TODO remove
    return this.authService.currentUserInfo.pipe(
      map(user => {
        return this.authService.getAttechedUserRef(user);
      }),
      switchMap(user => {
        return of({
          user: user,
          channel: channelId,
          notice: false,
          contents: '',
          images: [],
          favoriteCount: 0,
          favorites: [],
          created: firebase.firestore.FieldValue.serverTimestamp()
        } as Post);
      })
    );
  }

  updateNotice(postId: string, notice) {
    return this.collection.doc(postId).update({ notice });
  }

  toggleFavorite(postId, favorites) {
    return this.collection.doc(postId).update({
      favoriteCount: favorites.length,
      favorites
    });
  }
}
