import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.auth
    .getRedirectResult()
      .then(r => {
        this.user = r.user || this.afAuth.auth.currentUser;
      }, err => {
        alert(err);
      });
  }

  onClickSignIn(e: MouseEvent, type: string) {
    e.preventDefault();

    let provider;
    switch (type) {
      case 'facebook':
        provider = new auth.FacebookAuthProvider();
        break;
      case 'google':
        provider = new auth.GoogleAuthProvider();
        break;
      case 'github':
        provider = new auth.GithubAuthProvider();
        break;
      default:
    }

    this.afAuth.auth.signInWithRedirect(provider);
  }

  onClickSignOut(e: MouseEvent) {
    e.preventDefault();
    this.afAuth.auth
      .signOut()
      .then(r => {
        this.user = null;
      });
  }

}
