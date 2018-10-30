import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first, switchMapTo } from 'rxjs/operators';
import { UserInfo } from '../auth/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserInfo;
  bg: string;
  channelCode: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
      const channelCode = this.route.snapshot.queryParamMap.get('channelCode');
      if (channelCode) {
        this.channelCode = channelCode;
      }

      this.bg = `../../assets/img/bg${Math.floor((Math.random() * 3))}.jpg`;
    }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

  onJoin() {
    this.submitted = true;
    this.router.navigate(['/channels', this.channelCode, 'posts']);
  }

  onLogout() {
    this.authService.logout().pipe(
      first(),
      switchMapTo(this.authService.currentUserInfo)
    ).subscribe(user => this.user = user);
  }

}
