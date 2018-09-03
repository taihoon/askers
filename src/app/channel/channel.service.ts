import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { Channel } from './channel';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channelCollection: AngularFirestoreCollection<Channel>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.channelCollection = this.afs.collection('channels');
  }

  createChannel(channel: Channel) {
    return this.channelCollection.add(channel);
  }

  getNewChannel(channelCode): Observable<Channel> {
    const current = new Date();
    const start = new Date(current);
    const end = new Date(current);
    end.setDate(end.getDate() + 1);

    return this.authService.currentUserInfo.pipe(
      map(user => {
        return this.authService.getAttechedUserRef(user);
      }),
      switchMap(user => {
        return of({
          userRef: user,
          code: channelCode ? channelCode : '',
          title: '',
          desc: '',
          start: firestore.Timestamp.fromDate(start),
          end: firestore.Timestamp.fromDate(end),
          created: firestore.FieldValue.serverTimestamp()
        } as Channel);
      })
    );
  }

  isExistChannelByCode(channelCode): Observable<boolean> {
    return this.afs
      .collection<Channel>('channels', ref =>
        ref.where('code', '==', channelCode)
      )
      .valueChanges()
      .pipe(
        first(),
        map(channels => !!channels.length)
      );
  }

  getChannelByUser(uid: string): Observable<Channel[]> {
    return this.afs
      .collection<Channel>('channels', ref =>
        ref.where('userRef.uid', '==', uid)
      )
      .snapshotChanges()
      .pipe(
        map(channels => {
          return channels
            .map(channel => {
              return {
                id: channel.payload.doc.id,
                ...channel.payload.doc.data()
              } as Channel;
            });
          })
      );
  }

  getChannelByCode(channelCode): Observable<Channel> {
    return this.afs
      .collection<Channel>('channels', ref =>
        ref.where('code', '==', channelCode)
      )
      .snapshotChanges()
      .pipe(
        first(),
        map(channels => {
          // TODO use filter
          if (channels.length === 1) {
            return {
              id: channels[0].payload.doc.id,
              ...channels[0].payload.doc.data()
            } as Channel;
          }
        })
      );
  }
}
