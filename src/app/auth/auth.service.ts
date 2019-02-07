import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User, UserInfo } from './user';
import { Observable, from, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }

  // get user() {
  //   return this.afAuth.user;
  // }

  get currentUserInfo() {
    return this.afAuth.user.pipe(
      switchMap(user => {
        if (user) {
          return this.authenicatedUserInfo(user);
        } else {
          return this.anonymousUserInfo();
        }
      })
    );
  }

  private authenicatedUserInfo(user: firebase.User): Observable<UserInfo> {
    const { uid, displayName, photoURL } = user;
    return of({ uid, authenticated: true, displayName, photoURL });
  }

  private anonymousUserInfo(): Observable<UserInfo> {
    let user = this.getAnonymousUserFromSessionStorage();
    if (!user) {
      this.setAnonymousUserToSessionStorage();
      user = this.getAnonymousUserFromSessionStorage();
    }

    return of(user);
  }

  private getAnonymousUserFromSessionStorage() {
    return JSON.parse(sessionStorage.getItem('anonymouse'));
  }

  private setAnonymousUserToSessionStorage() {
    const currentTime = new Date().getTime().toString();
    const anonymouseUser = {
      uid: currentTime,
      authenticated: false,
      displayName: `anonymous${currentTime.slice(currentTime.length - 6)}`,
      photoURL: 'https://askers.io/assets/img/anonymous.png'
    };
    sessionStorage.setItem('anonymouse', JSON.stringify(anonymouseUser));
  }

  getAttechedUserRef(user: UserInfo): UserInfo {
    let userRef: UserInfo;

    if (user.authenticated) {
      userRef = Object.assign( user, {
        ref: this.afs.collection('users').doc<User>(user.uid).ref
      });
    } else {
      userRef = user;
    }

    return userRef;
  }

  createUser(email: string, password: string) {
    return from(this.afAuth.auth.
      createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap(credential => {
        const user = credential.user;
        return from(user.updateProfile({
          displayName: user.email.substring(0, user.email.lastIndexOf('@')),
          photoURL: 'https://askers.io/assets/img/profile.png'
        }));
      })
    );
  }

  login(email: string, password: string ) {
    return from(this.afAuth.auth.
      signInWithEmailAndPassword(email, password)
    ).pipe(
      tap(credential => this.updateCredential(credential))
    );
  }

  loginByProvider(target: string) {
    let provider;
    if (target === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (target === 'github') {
      provider = new firebase.auth.GithubAuthProvider();
    } else if (target === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    } else if (target === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => this.updateCredential(credential));
  }

  logout() {
    sessionStorage.removeItem('anonymouse');
    return from(this.afAuth.auth.signOut());
  }

  updateCredential(credential: firebase.auth.UserCredential) {
    this.updateUser(credential.user.uid, {
      email: credential.user.email,
      displayName: credential.user.displayName,
      photoURL: credential.user.photoURL
    });
  }

  updateUser(uid: string, user: User) {
    this.afs.collection('users').doc(uid).set(user);
  }

}
