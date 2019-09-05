import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '@app/core/http/firestore.service';
import { Post } from '@app/core/models';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PostService extends FirestoreService<Post> {

  constructor(protected afs: AngularFirestore) {
    super(afs, 'posts');
  }

  public getNoticePostsByChannelId(channelId: string) {
    const channelRef = this.afs.doc(`channels/${channelId}`).ref;
    return this.query({
      where: [
        ['channelRef', '==', channelRef],
        ['notice', '==', true]
      ],
      orderBy: [['created', 'desc']]
    });
  }

  public getStreamPostsByChannelId(channelId: string) {
    const channelRef = this.afs.doc(`channels/${channelId}`).ref;
    return this.query({
      where: [
        ['channelRef', '==', channelRef],
        ['notice', '==', false]
      ],
      orderBy: [['created', 'desc']]
    }, true);
  }

  public toggleFavorite(postId: string, userId: string) {
    const postRef = this.getDocRef(postId);
    const userRef = this.afs.doc(`users/${userId}`).ref;
    return this.afs.firestore.runTransaction(transaction => {
      return transaction.get(postRef).then(doc => {
        const post: Partial<Post> = doc.data();
        if (post.favoriteUserRefs.find(ref => userRef.isEqual(ref))) {
          return transaction.update(postRef, {
            favoriteCount: firestore.FieldValue.increment(-1),
            favoriteUserRefs: firestore.FieldValue.arrayRemove(userRef)
          });
        } else {
          return transaction.update(postRef, {
            favoriteCount: firestore.FieldValue.increment(1),
            favoriteUserRefs: firestore.FieldValue.arrayUnion(userRef)
          });
        }
      });
    });
  }

}
