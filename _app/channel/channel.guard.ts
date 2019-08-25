import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { ChannelService } from '../channel/channel.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelGuard implements CanActivate {
  constructor(
    private router: Router,
    private channelService: ChannelService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const channelCode = next.paramMap.get('channelCode');
      return this.channelService.getChannelByCode(channelCode).pipe(
        tap(channel => {
          if (!channel) {
            this.router.navigate(['/channels', 'new', 'edit'], { queryParams: { channelCode }});
          }
        }),
        map(channel => !!channel)
      );
  }

}
