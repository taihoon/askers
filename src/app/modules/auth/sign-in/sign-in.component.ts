import { Component, OnInit } from '@angular/core';
import { NewUser, User } from '@app/core/models';
import { AuthService, UserService } from '@app/core/http';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.getSignInWithRedirectResult().then(u => {
      if (u) {
        this.user = u;
      } else if (this.authService.currentUser) {
        this.user = this.authService.currentUser;
      }
    });
  }

  onClickSignIn(e: MouseEvent, provider: 'github' | 'google' | 'facebook') {
    e.preventDefault();
    this.authService.signInWithRedirect(provider).then();
  }

  onClickSignOut(e: MouseEvent) {
    e.preventDefault();
    this.authService.signOut().then(r => {
      console.log(r);
      this.user = null;
    });
  }

}
