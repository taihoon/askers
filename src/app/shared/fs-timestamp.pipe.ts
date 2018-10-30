import { Pipe, PipeTransform } from '@angular/core';
import { firestore } from 'firebase';

@Pipe({
  name: 'fsTimestamp'
})
export class FsTimestampPipe implements PipeTransform {
  transform(value: firestore.Timestamp, args?: any): Date {
    if (value) {
      return value.toDate();
    } else {
      return new Date();
    }
  }

}
