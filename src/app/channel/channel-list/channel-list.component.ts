import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';

interface SortBy {
  field: string;
  order: 'asc' | 'desc';
}

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
  channels$: Observable<Channel[]>;
  sortByFlag = 'codeasc';

  protected sortBy$ = new BehaviorSubject({ field: 'code', order: 'asc' } as SortBy);

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService
  ) { }

  ngOnInit() {
    const uid = this.route.snapshot.queryParamMap.get('uid') ?
      this.route.snapshot.queryParamMap.get('uid') : this.route.snapshot.data.user.uid;

    this.channels$ = this.sortBy$.pipe(
      tap(sortBy => this.sortByFlag = `${sortBy.field}${sortBy.order}`),
      switchMap(sortBy => this.channelService.getChannelByUser(uid, sortBy.field, sortBy.order))
    );
  }

  onSortBy(sortBy: SortBy) {
    this.sortBy$.next(sortBy);
  }

}
