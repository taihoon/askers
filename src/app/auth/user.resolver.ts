import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { User } from './user';
import { AuthService } from './auth.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return Observable.create(observer => {
      this.authService.currentUserInfo.pipe(
        first()
      ).subscribe(user => {
        observer.next(user);
        observer.complete();
      });
    });
  }

}
