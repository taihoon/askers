import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  channels$: Observable<Channel[]>;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService
  ) { }

  ngOnInit() {
    this.channels$ = this.route
      .queryParamMap
      .pipe(
        switchMap(paramMap => {
          let uid =  paramMap.get('uid');
          if (!uid) {
            uid = this.route.snapshot.data.user.uid;
          }
          return this.channelService.getChannelByUser(uid);
        })
      );
  }

}
