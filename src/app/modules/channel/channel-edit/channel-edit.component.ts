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
    console.log('asdf');
    const channelId = this.route.snapshot.paramMap.get('channelId');
    this.channelService.get(channelId).subscribe(c => this.channel = c);
  }

  onSubmitChannel() {
    const channelId = this.route.snapshot.paramMap.get('channelId');
    delete this.channel.id;
    this.channelService.update(channelId, this.channel)
      .then(_ => this.router.navigate(['/channels']));
  }

}
