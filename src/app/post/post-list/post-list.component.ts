import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { UserInfo } from '../../auth/user';
import { Channel } from '../../channel/channel';
import { PostWithReplies } from '../post';
import { PostService } from '../post.service';
import { PostSubscribeService } from '../post-subscribe.service';

/**
 * Component Struct
 *
 * + PostListComponent
 *    - PostFormComponent           // For write post
 *    + PostDetailComponent
 *       + ReplyListComponent
 *         - PostFormComponent      // For write reply
 *         - ReplyDetailComponent
 */

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  user: UserInfo;
  channel: Channel;
  postWithRepliesList$: Observable<PostWithReplies[]>;
  isChannelOwner = false;
  sortBy = 'favoriteCount';

  private pauseSubscribe = false;
  private sortBy$ = new BehaviorSubject(this.sortBy);

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private postSubscribeService: PostSubscribeService,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.channel = this.route.snapshot.data.channel;
    this.isChannelOwner = this.channel.userRef.uid === this.user.uid;

    this.postSubscribeService.pause$
      .subscribe(pause => this.pauseSubscribe = pause);

    this.postSubscribeService.resume();

    this.postWithRepliesList$ =
      this.sortBy$
        .pipe(
          switchMap(sortBy => (
            this.postService
              .getPostWithRepliesByChannelId(
                this.channel.id,
                sortBy
              )
          )),
          filter(_ => !this.pauseSubscribe)
        );
  }

  share() {
    this.clipboardService.copyFromContent(
      `https://askers.io/channels/${this.channel.code}/posts`
    );
    alert('The URL is Copied to clipboard');
  }

  onSortBy(sortBy) {
    this.postSubscribeService.resume();
    this.sortBy$.next(sortBy);
    this.sortBy = sortBy;
  }

  onSubmitPost() {
    this.ngOnInit
  }
}
