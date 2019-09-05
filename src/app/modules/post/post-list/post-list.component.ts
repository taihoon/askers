import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { NewPost, Post } from '@app/core/models';
import { AuthService, ChannelService, PostService, UserService } from '@app/core/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  newPost: NewPost;
  noticePostList$: Observable<Post[]>;
  postList$: Observable<Post[]>;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private channelService: ChannelService,
    private postService: PostService) {
  }

  ngOnInit() {
    this.newPost = this.getNewPost();

    const channelId = this.route.snapshot.paramMap.get('channelId');
    this.noticePostList$ = this.postService.getNoticePostsByChannelId(channelId);
    this.postList$ = this.postService.getStreamPostsByChannelId(channelId);
  }

  private getNewPost() {
    const userId = this.authService.currentUser.id;
    const channelId = this.route.snapshot.paramMap.get('channelId');
    return {
      userRef: this.userService.getDocRef(userId),
      channelRef: this.channelService.getDocRef(channelId),
      parentRef: null,
      notice: false,
      contents: '',
      favoriteCount: 0,
      favoriteUserRefs: [],
      created: firestore.FieldValue.serverTimestamp()
    } as NewPost;
  }

  onClickToggleFavorite(e: Event, post: Post) {
    e.preventDefault();
    const userId = this.authService.currentUser.id;
    this.postService.toggleFavorite(post.id, userId);
    console.log(post);
  }

  onSubmitPost() {
    this.postService.add(this.newPost).then(() => {
      this.newPost = this.getNewPost();
    });
  }

}
