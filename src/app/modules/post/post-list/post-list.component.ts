import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { Channel, NewPost } from '@app/core/models';
import { AuthService, ChannelService, PostService, UserService } from '@app/core/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postList$: Observable<Channel[]>;
  newPost: NewPost;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private channelService: ChannelService,
    private postService: PostService) {
  }

  ngOnInit() {
    const channelId = this.route.snapshot.paramMap.get('channelId');
    this.newPost = this.getNewPost();
    this.postList$ = this.postService.search([
      ['channelRef', '==', this.channelService.getDocRef(channelId)]
    ]);
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
      favorites: [],
      created: firestore.FieldValue.serverTimestamp()
    } as NewPost;
  }

  onSubmitPost() {
    this.postService.add(this.newPost).then(() => {
      this.newPost = this.getNewPost();
    });
  }

}
