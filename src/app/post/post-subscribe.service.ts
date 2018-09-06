import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostSubscribeService {

  private _pause$ = new Subject<boolean>();

  constructor() { }

  get pause$() {
    return this._pause$;
  }

  pause() {
    this._pause$.next(true);
  }

  resume() {
    this._pause$.next(false);
  }

}
