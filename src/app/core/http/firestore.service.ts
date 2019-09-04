import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export interface QueryOptions {
  where: [string, firestore.WhereFilterOp, any][];
  orderBy?: [string, firestore.OrderByDirection?][];
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

  protected query(options: QueryOptions, streamable = false) {
    let observable = this.afs.collection<T>(this.collection.ref, ref => {
      let query: firestore.CollectionReference | firestore.Query = ref;
      if (options.where) {
        options.where.forEach(w => {
          query = query.where(w[0], w[1], w[2]);
        });
      }
      if (options.orderBy) {
        options.orderBy.forEach(o => {
          if (o.length === 1) {
            query = query.orderBy(o[0]);
          } else {
            query = query.orderBy(o[0], o[1]);
          }
        });
      }
      if (options.limit) {
        query = query.limit(options.limit);
      }
      if (options.startAt) {
        query = query.startAt(options.startAt);
      }
      if (options.startAfter) {
        query = query.startAfter(options.startAfter);
      }
      if (options.endAt) {
        query = query.endAt(options.endAt);
      }
      if (options.endBefore) {
        query = query.endBefore(options.endBefore);
      }
      return query;
    }).snapshotChanges();

    if (!streamable) {
      observable = observable.pipe(first());
    }

    return observable.pipe(
      map( actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data();
        return { id, ...data };
      }))
    );
  }

}
