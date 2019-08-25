import { Pipe, PipeTransform } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Pipe({
  name: 'fsTimestamp'
})
export class FsTimestampPipe implements PipeTransform {
  transform(value: firebase.firestore.Timestamp, args?: any): Date {
    if (value) {
      return value.toDate();
    } else {
      return new Date();
    }
  }

}
