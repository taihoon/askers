import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '@app/core/http/firestore.service';
import { Post } from '@app/core/models';

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
      where: [['channelRef', '==', channelRef]],
      orderBy: [['created', 'desc']]
    }, true);
  }

}
