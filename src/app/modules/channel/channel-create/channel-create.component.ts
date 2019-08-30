import { Component, OnInit } from '@angular/core';
import { NewChannel } from '@app/core/models/channel';
import { AuthService, UserService } from '@app/core/http';
import { firestore } from 'firebase/app';
import addDays from 'date-fns/addDays';
import addMinutes from 'date-fns/addMinutes';
import setSeconds from 'date-fns/setSeconds';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent implements OnInit {

  newChannel: NewChannel;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    // private channelService: ChannelService
  ) {
    const start = setSeconds(addMinutes(new Date(), 10), 0);
    const end = addDays(start, 1);

    this.newChannel = {
      userRef: this.userService.getUserRef(this.authService.currentUser.id),
      code: '',
      title: '',
      desc: '',
      start: firestore.Timestamp.fromDate(start),
      end: firestore.Timestamp.fromDate(end),
      created: firestore.FieldValue.serverTimestamp()
    };
  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
