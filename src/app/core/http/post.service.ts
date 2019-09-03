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
}
