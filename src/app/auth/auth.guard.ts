import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { UserInfo } from '../auth/user';
import { AuthService } from './auth.service';
import { mapTo, partition, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const [auth$, anony$] =
        partition(user => (<UserInfo>user).authenticated)(this.authService.currentUserInfo);

      return merge(
        auth$.pipe(
          mapTo(true)
        ),
        anony$.pipe(
          tap(_ => {
            this.router.navigate(
              ['/login'],
              { queryParams: { redirect: state.url }}
            );
          }),
          mapTo(false)
        )
      );
  }

}
