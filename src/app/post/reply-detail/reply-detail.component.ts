import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../auth/user';
import { Channel } from '../../channel/channel';
import { Post } from '../../post/post';
import { PostService } from '../../post/post.service';
import { PostSubscribeService } from '../post-subscribe.service';

@Component({
  selector: 'app-reply-detail',
  templateUrl: './reply-detail.component.html',
  styleUrls: ['./reply-detail.component.css']
})
export class ReplyDetailComponent implements OnInit {
  @Input() user: UserInfo;
  @Input() channel: Channel;
  @Input() parent: string;
  @Input() post: Post;

  isChannelOwner: boolean;
  isPostOwner: boolean;
  available: boolean;

  private MAX_DISPLAYED_FAVORITE_COUNT = 10;
  editable = false;

  constructor(
    private postService: PostService,
    private postSubscribeService: PostSubscribeService) {}

  ngOnInit() {
    this.isChannelOwner = this.channel.userRef.uid === this.user.uid;
    this.isPostOwner = this.user.uid === this.post.user.uid;
    this.available = Date.now() < this.channel.end.seconds * 1000;
  }

  get moreFavoritedCount() {
    if (this.post.favoriteCount > this.MAX_DISPLAYED_FAVORITE_COUNT) {
      return this.post.favoriteCount - this.MAX_DISPLAYED_FAVORITE_COUNT;
    } else {
      return 0;
    }
  }

  get displayFavorites() {
    if (this.post.favoriteCount > this.MAX_DISPLAYED_FAVORITE_COUNT) {
      return this.post.favorites.slice(0, this.MAX_DISPLAYED_FAVORITE_COUNT);
    } else {
      return this.post.favorites.slice(0);
    }
  }

  get isFavorited() {
    return this.post.favorites.some(user => user.uid === this.user.uid);
  }

  onToggleNotice() {
    this.postService.updateNotice(this.post.id, !this.post.notice);
  }

  onToggleFavoritePost(post) {
    const favorites = post.favorites;
    const favoriteIdx = favorites.findIndex(user => user.uid === this.user.uid);

    if (favoriteIdx === -1) {
      favorites.unshift(this.user);
    } else {
      favorites.splice(favoriteIdx, 1);
    }

    // TODO convert to observable
    this.postService.toggleFavorite(this.post.id, favorites);
  }

  onEditPost() {
    this.editable = true;
    this.postSubscribeService.pause();
  }

  onDeletePost() {
    this.postService.deletePost(this.post.id);
  }

  onCancelSubmitPost() {
    this.editable = false;
    this.postSubscribeService.resume();
  }
}
