import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../channel';

@Component({
  selector: 'app-channel-edit',
  templateUrl: './channel-edit.component.html',
  styleUrls: ['./channel-edit.component.css']
})
export class ChannelEditComponent implements OnInit {
  channel: Channel;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.channel = this.route.snapshot.data.channel;
  }

}
