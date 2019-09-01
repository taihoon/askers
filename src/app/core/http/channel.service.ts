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

}
