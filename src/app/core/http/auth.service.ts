import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '@app/core/models/user';

export enum AuthProvider {
  Github = 'github',
  Google = 'google',
  Facebook = 'facebook'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }

  get currentUser() {
    const { uid, displayName } = this.afAuth.auth.currentUser;
    return {
      id: uid,
      displayName
    };
  }

  signIn(authProvider: AuthProvider) {
    let authProviderInstance;
    switch (authProvider) {
      case AuthProvider.Github:
        authProviderInstance = new auth.GithubAuthProvider();
        break;
      case AuthProvider.Google:
        authProviderInstance = new auth.GoogleAuthProvider();
        break;
      case AuthProvider.Facebook:
        authProviderInstance = new auth.FacebookAuthProvider();
        break;
      default:
    }
    return this.afAuth.auth.signInWithRedirect(authProviderInstance);
  }

  getRedirectResult() {
    return this.afAuth.auth.getRedirectResult().then(r => {
      if (r.user) {
        return {
          id: r.user.uid,
          displayName: r.user.displayName
        } as User;
      } else {
        return null;
      }
    }, err => {
      alert(err);
    });
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

}
