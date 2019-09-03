import { Component, OnInit } from '@angular/core';
import { NewUser, User } from '@app/core/models';
import { AuthProvider, AuthService, UserService } from '@app/core/http';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User | void;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.authService.currentUser) {
      this.user = this.authService.currentUser;
    } else {
      this.authService.getRedirectResult().then(u => {
        if (u) {
          this.userService.setUser(u.id, {} as NewUser);
        }
      });
    }
  }

  onClickSignIn(e: MouseEvent, provider: AuthProvider) {
    e.preventDefault();
    this.authService.signIn(provider);
  }

  onClickSignOut(e: MouseEvent) {
    e.preventDefault();
    this.authService.signOut().then(r => {
        this.user = null;
      });
  }

}
