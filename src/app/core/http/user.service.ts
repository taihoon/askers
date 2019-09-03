import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NewUser, User } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private collection: AngularFirestoreCollection<Partial<User>>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Partial<User>>('users');
  }

  setUser(id: string, user: NewUser) {
    return this.collection.doc(id).set(user);
  }

  getDocRef(id: string) {
    return this.afs.doc(`users/${id}`).ref;
  }
}
