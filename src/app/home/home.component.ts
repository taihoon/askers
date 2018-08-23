import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first, switchMapTo } from 'rxjs/operators';
import { UserInfo } from '../auth/user';
import { AuthService } from '../auth/auth.service';
import { ChannelService } from '../channel/channel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserInfo;
  channelCode: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private channelService: ChannelService) {
      const channelCode = this.route.snapshot.queryParamMap.get('channelCode');
      if (channelCode) {
        this.channelCode = channelCode;
      }
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
