import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Channel } from '@app/core/models/channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelListService {
  private collection: AngularFirestoreCollection<Channel>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Channel>('channels');
  }

  public searchByUserId(userId: string): Observable<Channel[]> {
    return this.afs
      .collection<Channel>(this.collection.ref, ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('userRef.uid', '==', userId);
        return query;
      })
      .snapshotChanges()
      .pipe(
        first(),
        map(actions => actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { id, ...data };
        }))
      );
  }
}
