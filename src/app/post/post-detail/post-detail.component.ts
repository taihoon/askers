import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { PostService } from '../post.service';
import { UserInfo } from '../../auth/user';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  user: UserInfo;
  editable = false;
  isCreated = false;
  isFavorited = false;
  favorites: Array<any>;
  moreFavoritedCount = 0;

  private MAX_FAVORITE_DISPLAY_COUNT = 10;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit() {
    const favoriteCount = this.post.favorites.length;

    this.user = this.route.snapshot.data.user;
    this.isCreated = this.user.uid === this.post.user.uid;

    if (favoriteCount > this.MAX_FAVORITE_DISPLAY_COUNT) {
      this.favorites = this.post.favorites.slice(0, this.MAX_FAVORITE_DISPLAY_COUNT);
      this.moreFavoritedCount = favoriteCount - this.MAX_FAVORITE_DISPLAY_COUNT;
    } else {
      this.favorites = this.post.favorites.slice(0);
    }

    this.isFavorited = this.post.favorites.some(user => user.uid === this.user.uid);
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
    this.postService.toggleFavorite(post.id, favorites);
  }

  onEditPost() {
    this.editable = true;
  }

  onDeletePost() {
    this.postService.deletePost(this.post);
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
