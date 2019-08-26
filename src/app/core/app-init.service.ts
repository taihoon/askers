import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private afAuth: AngularFireAuth) { }

  init(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe(u => {
        resolve(u);
      });
    });
  }
}
