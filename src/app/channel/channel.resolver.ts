import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Channel } from './channel';
import { ChannelService } from './channel.service';

@Injectable()
export class NewChannelResolver implements Resolve<Channel> {
  constructor(private channelService: ChannelService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Channel> {
    const channelCode = route.paramMap.get('channelCode');
    return Observable.create(observer => {
      this.channelService.getNewChannel(channelCode).pipe(
        first()
      ).subscribe(channel => {
        observer.next(channel);
        observer.complete();
      });
    });
  }
}

@Injectable()
export class ChannelResolver implements Resolve<Channel> {
  constructor(private channelService: ChannelService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Channel> {
    const channelCode = route.paramMap.get('channelCode');
    return Observable.create(observer => {
      this.channelService.getChannelByCode(channelCode).pipe(
        first()
      ).subscribe(channel => {
        observer.next(channel);
        observer.complete();
      });
    });
  }
}
