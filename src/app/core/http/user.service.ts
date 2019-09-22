import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@app/core/models';
import { FirestoreService } from '@app/core/http/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirestoreService<User> {
  
  constructor(protected afs: AngularFirestore) {
    super(afs, 'users');
  }
}
