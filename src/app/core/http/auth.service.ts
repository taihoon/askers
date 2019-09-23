import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@app/core/models';

import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

export enum AuthProvider {
  Github = 'github',
  Google = 'google',
  Facebook = 'facebook'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentAdmin = false;
  private _currentUser: User = null;

  constructor(
    private router: Router,
    private location: Location,
    private afAuth: AngularFireAuth) {
    this.admin.subscribe(a => this._currentAdmin = a);
    this.user.subscribe(u => {
      this._currentUser = u;
    });
  }

  get admin() {
    return this.afAuth.idTokenResult.pipe(
      map(r => {
        if (r && r.claims) {
          return r.claims.admin;
        } else {
          return false;
        }
      })
    );
  }

  get user() {
    return this.afAuth.user.pipe(
      map(u => {
        if (u) {
          return {
            id: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL
          };
        } else {
          return null;
        }
      })
    );
  }

  get currentAdmin() {
    return this._currentAdmin;
  }

  get currentUser() {
    return this._currentUser;
  }

  signInWithRedirect(authProvider: string) {
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

  getSignInWithRedirectResult() {
    return this.afAuth.auth.getRedirectResult().then(r => {
      if (r.user) {
        return {
          id: r.user.uid,
          email: r.user.email,
          displayName: r.user.displayName,
          photoURL: r.user.photoURL
        } as User;
      } else {
        return null;
      }
    }, err => {
      alert(err);
    });
  }

  signInLinkToEmail(email: string) {
    // https://firebase.google.com/docs/auth/web/email-link-auth
    const actionCodeSettings = {
      url: window.location.origin + '/signin-result',
      handleCodeInApp: true
    };
    return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(error => alert(error));
  }

  getSignInLinkToEmailResult() {
    const isSignInWithEmilLink = this.afAuth.auth.isSignInWithEmailLink(window.location.href);

    if (isSignInWithEmilLink) {
      const email = window.localStorage.getItem('emailForSignIn');
      return this.afAuth.auth.signInWithEmailLink(email, window.location.href)
        .then(r => {
          window.localStorage.removeItem('emailForSignIn');
          return r.user;
        });
    } else {
      return Promise.resolve(null);
    }
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

}
