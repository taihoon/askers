import { Component, OnInit } from '@angular/core';
import { ChannelService } from '@app/core/http';
import { Channel } from '@app/core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-edit',
  templateUrl: './channel-edit.component.html',
  styleUrls: ['./channel-edit.component.css']
})
export class ChannelEditComponent implements OnInit {

  channel: Channel;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService
  ) { }

  ngOnInit() {
    const channelId = this.route.snapshot.params['channelId'];
    this.channelService.get(channelId).subscribe(c => this.channel = c);
  }

  onSubmitChannelUpdate() {
    this.channelService.update(this.channel);
  }

}
