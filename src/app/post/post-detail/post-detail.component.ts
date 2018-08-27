import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { UserInfo } from '../../auth/user';
import { Post } from '../post';
import { Channel } from '../../channel/channel';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() user: UserInfo;
  @Input() channel: Channel;
  @Input() post: Post;

  private MAX_DISPLAYED_FAVORITE_COUNT = 10;
  editable = false;

  constructor(private postService: PostService) { }

  ngOnInit() { }

  get isChannelOwner() {
    return this.user.uid === this.channel.userRef.uid;
  }

  get isPostOwner() {
    return this.user.uid === this.post.user.uid;
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
    const favoriteIdx = favorites.findIndex(user => (
      user.uid === this.user.uid));

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
  }

  onDeletePost() {
    this.postService.deletePost(this.post.id);
  }

  onCancelSubmitPost() {
    this.editable = false;
  }

  onSubmitPost(param) {
    if (param.result === 'success') {
      this.editable = false;
    }
  }

}
