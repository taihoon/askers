import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../auth/user';
import { Channel } from '../../channel/channel';
import { Post } from '../../post/post';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {

  @Input() user: UserInfo;
  @Input() channel: Channel;
  @Input() parent: string;
  @Input() replies: Post[];
  @Input() showForm: boolean;
  @Input() available: boolean;

  constructor() {}

  ngOnInit() { }
}
