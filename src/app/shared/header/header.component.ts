import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { UserInfo } from '../../auth/user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'div[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: Observable<UserInfo>;
  channel: string;

  constructor(
    private router: Router,
    private authService: AuthService) {
      this.user = this.authService.currentUserInfo;
      // this.authService.currentUserInfo.subscribe(user => {
      //   this.resolved = true;
      //   this.user = user;
      // });
  }

  get rediretUrlQueryString() {
    const url = this.router.routerState.snapshot.url;
    if (url === '/login') {
      return null;
    } else {
      return { redirect: url };
    }
  }

  go() {
    this.router.navigate(['/channels', this.channel, 'posts']);
    this.channel = '';
  }

  logout() {
    this.authService
      .logout()
      .subscribe(_ => {
        this.router.navigate(
          ['/login'],
          { queryParams: { redirect: this.rediretUrlQueryString }});
      });
  }

}
