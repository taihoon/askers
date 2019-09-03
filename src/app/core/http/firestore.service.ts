import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export interface SearchOptions {
  where: [string, string, any];
  orderBy?: [string, string?];
  limit?: number;
  startAt?: firestore.DocumentSnapshot;
  startAfter?: firestore.DocumentSnapshot;
  endAt?: firestore.DocumentSnapshot;
  endBefore?: firestore.DocumentSnapshot;

}

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

  public getDocRef(docId: string) {
    return this.afs.doc(`${this.path}/${docId}`).ref;
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

  public search(options: [string, string, any][]) {
    this.afs.collection<T>(this.collection.ref, ref => {
      let query: firestore.CollectionReference | firestore.Query = ref;
      options.forEach(option => {
        query = query.where(option[0], option[1], option[2])
      })
    })
  }

  public searchByUserId(userId: string): Observable<T[]> {
    const userRef = this.afs.doc(`users/${userId}`).ref;
    return this.afs
      .collection<T>(this.collection.ref, ref => {
        let query: firestore.CollectionReference | firestore.Query = ref;
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
