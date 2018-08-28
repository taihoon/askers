import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { UserInfo } from '../../auth/user';
import { Channel } from '../../channel/channel';
import { Post, PostWithReplies } from '../post';
import { PostService } from '../post.service';

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
  newPost: Post;
  postWiteRepliesList$: Observable<PostWithReplies[]>;
  isChannelOwner = false;
  sortBy = 'favoriteCount';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.channel = this.route.snapshot.data.channel;
    this.newPost = this.route.snapshot.data.newPost;
    this.isChannelOwner = this.channel.userRef.uid === this.user.uid;

    this.postWiteRepliesList$ = this.postService
      .getPostWithRepliesByChannelId(this.channel.id, this.sortBy);
  }

  share() {
    this.clipboardService.copyFromContent(
      `https://askers.io/channels/${this.channel.code}/posts`
    );
    alert('The URL is Copied to clipboard');
  }

  onSortBy(sortBy) {
    this.sortBy = sortBy;
    this.postWiteRepliesList$ = this.postService
      .getPostWithRepliesByChannelId(this.channel.id, this.sortBy);
  }

  onSubmitPost() {
    this.postService
      .getNewPost(this.channel.id)
      .subscribe(post => (this.newPost = post));
  }
}
