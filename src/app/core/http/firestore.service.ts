import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export abstract class FirestoreService<T> {
  protected collection: AngularFirestoreCollection<any>;

  protected constructor(
    protected afs: AngularFirestore,
    private path: string) {
    this.collection = afs.collection<any>(this.path);
  }

  protected getUserRef(userId: string) {
    return this.afs.doc(`users/${userId}`).ref;
  }

  public add(doc: Partial<T>) {
    return this.collection.add(doc);
  }

  public get(docId: string): Observable<T> {
    return this.collection.doc(docId)
      .snapshotChanges()
      .pipe(
        first(),
        map(a => {
          const id = a.payload.id;
          const data = a.payload.data();
          return {id, ...data} as T;
        })
      );
  }

  public update(doc: T) {
    const docId = doc['id'];
    delete doc['id'];
    return this.collection.doc(docId).update(doc);
  }

  public delete(doc: T) {
    return this.collection.doc(doc['id']).delete();
  }

  public searchByUserId(userId: string): Observable<T[]> {
    const userRef = this.getUserRef(userId);
    return this.afs
      .collection<T>(this.collection.ref, ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('userRef', '==', userRef);
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
