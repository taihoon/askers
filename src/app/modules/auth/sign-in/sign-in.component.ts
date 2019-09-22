import { Component, OnInit } from '@angular/core';
import { NewUser, User } from '@app/core/models';
import { AuthService, UserService } from '@app/core/http';

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
    if (this.authService.currentUser) {
      this.user = this.authService.currentUser;
      console.log('1', this.user);
    } else {
      this.authService.getSignInWithRedirectResult().then(u => {
        if (u) {
          console.log('2', u);
          this.userService.create(u.id, {} as NewUser).then();
        } else {
          console.log('3', u);
        }
      });
    }
  }

  onClickSignIn(e: MouseEvent, provider: 'github' | 'google' | 'facebook') {
    e.preventDefault();
    this.authService.signInWithRedirect(provider).then();
  }

  onClickSignOut(e: MouseEvent) {
    e.preventDefault();
    this.authService.signOut().then(r => {
        this.user = null;
      });
  }

}
