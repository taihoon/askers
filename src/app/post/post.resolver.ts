import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from './post';
import { PostService } from './post.service';

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    // see more https://github.com/angular/angularfire2/issues/624#issuecomment-259164228
    return this.postService.getPostById(route.paramMap.get('postId'));
  }

}
