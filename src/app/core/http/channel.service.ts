import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Channel } from '@app/core/models/channel';
import { FirestoreService } from '@app/core/http/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends FirestoreService<Channel> {

  constructor(protected afs: AngularFirestore) {
    super(afs, 'channels');
  }

  public getChannelsByUserId(userId: string) {
    const userRef = this.afs.doc(`users/${userId}`).ref;
    return this.query({
      where: [['userRef', '==', userRef]],
      orderBy: [['created', 'desc']]
    });
  }

}
