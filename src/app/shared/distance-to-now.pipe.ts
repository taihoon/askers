import { Pipe, PipeTransform } from '@angular/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

@Pipe({
  name: 'distanceToNow'
})
export class DistanceToNowPipe implements PipeTransform {
  constructor() { }

  transform(value: Date, args?: any): any {
    if (value) {
      return formatDistanceToNow(value);
    }
  }

}
