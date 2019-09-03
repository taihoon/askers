import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '@app/core/http';
import { Channel } from '@app/core/models';

@Component({
  selector: 'app-channel-edit',
  templateUrl: './channel-edit.component.html',
  styleUrls: ['./channel-edit.component.css']
})
export class ChannelEditComponent implements OnInit {

  channel: Channel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private channelService: ChannelService
  ) { }

  ngOnInit() {
    const channelId = this.route.snapshot.params['channelId'];
    this.channelService.get(channelId).subscribe(c => this.channel = c);
  }

  onSubmitChannel() {
    this.channelService.update(this.channel)
      .then(_ => this.router.navigate(['/channels']));
  }

}
