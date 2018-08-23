import { Component } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { filter } from '../../node_modules/rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationStart),
    ).subscribe(event => {
      this.showHeader = !(<ActivationStart>event).snapshot.data.hideHeader;
    });
  }
}
