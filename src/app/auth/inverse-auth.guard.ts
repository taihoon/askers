import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InverseAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.currentUserInfo.pipe(
        map(user => !!user),
        tap(user => {
          if (!user) {
            this.router.navigate(['/']);
          }
        })
      );
  }

}
