import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChannelListService } from '@app/core/http/channel-list.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  channelList$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private channelListService: ChannelListService
  ) { }

  ngOnInit() {
    this.channelList$ = this.channelListService.searchByUserId(this.afAuth.auth.currentUser.uid);
  }

}
