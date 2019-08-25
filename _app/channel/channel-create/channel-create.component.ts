import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../channel';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent implements OnInit {
  channel: Channel;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.channel = this.route.snapshot.data.channel;
  }

}
