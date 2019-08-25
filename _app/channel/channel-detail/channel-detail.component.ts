import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../channel';
import { AuthService } from '../../auth/auth.service';
import { ChannelService } from '../channel.service';


@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.css']
})
export class ChannelDetailComponent implements OnInit {
  channelCode: string;
  channel: Channel;
  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private channelService: ChannelService) {
      // this.isAuthenticated = this.authService.currentUserInfo.authenticated;
  }

  ngOnInit() {
    this.channelCode = this.route.snapshot.paramMap.get('channelCode');
    this.channel = this.route.snapshot.data.channel;
  }

}
