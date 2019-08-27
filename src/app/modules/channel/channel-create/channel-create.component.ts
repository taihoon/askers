import { Component, OnInit } from '@angular/core';
import { NewChannel } from '@app/core/models/channel';
import { AuthService, UserService } from '@app/core/http';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent implements OnInit {

  newChannel: NewChannel;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.newChannel = {
      userRef: this.userService.getUserRef(this.authService.currentUser.id),
      code: '',
      title: '',
      desc: '',
      start: firestore.Timestamp.fromDate(today),
      end: firestore.Timestamp.fromDate(tomorrow),
      created: firestore.FieldValue.serverTimestamp()
    };
  }

  ngOnInit() {
  }

}
