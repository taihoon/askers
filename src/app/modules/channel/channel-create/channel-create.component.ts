import { Component, OnInit } from '@angular/core';
import { NewChannel } from '@app/core/models/channel';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent implements OnInit {

  newChannel: NewChannel;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.newChannel = {
      userRef: this.afs.doc(`users/${afAuth.auth.currentUser.uid}`).ref,
      code: '',
      title: '',
      desc: '',
      start: firestore.Timestamp.now(),
      end: firestore.Timestamp.now(),
      created: firestore.FieldValue.serverTimestamp()
    };
  }

  ngOnInit() {
  }

}
