import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  // private _post: Post; // TODO remove
  contents = '';
  submitted = false;
  preview = false;

  // TODO make it to type
  @Input() type: string;
  @Input() channel: string;
  @Input() parent: null | string = null;
  @Input() post: null | Post;
  // @Input() set post(post: Post) {
  //   this._post = Object.assign({}, post);
  // }
  // @Output() protected submitPost = new EventEmitter<{ result: string, data?: any }>();
  @Output() cancel = new EventEmitter<null>();

  // get post() {
  //   return this._post;
  // }

  // TODO make it reactive forms
  constructor(private postService: PostService) { }

  ngOnInit() {
    if (this.post) {
      this.contents = this.post.contents;
    }
  }

  onPreview(preview) {
    this.preview = preview;
  }

  onCancel(e) {
    this.cancel.emit();
  }

  onSubmit() {
    // TODO move toparents component
    if (this.type === 'write') {
      this.savePost();
    } else if (this.type === 'edit') {
      this.updatePost();
    }
    return false;
  }

  savePost() {
    if (!this.submitted) {
      this.submitted = true;

      const contents = this.contents;
      this.contents = '';

      this.postService
        .savePost({
          channel: this.channel,
          parent: this.parent,
          contents: contents
        })
        .subscribe(
          _ => this.success(),
          err => this.error(err)
        );
    }
  }

  updatePost() {
    if (!this.submitted) {
      this.submitted = true;

      const contents = this.contents;
      this.contents = '';

      const updatedPost = {
        contents: contents
      };
      this.postService
        .updatePost(this.post.id, updatedPost)
        .subscribe(
          _ => this.success(),
          err => this.error(err)
        );
    }
  }

  success() {
    this.contents = '';
    this.preview = false;
    this.submitted = false;
  }

  error(err) {
    alert(err);
    this.submitted = false;
  }
}
