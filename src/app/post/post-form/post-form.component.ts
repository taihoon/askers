import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  private _post: Post;
  submitted = false;
  preview = false;

  // TODO make it to type
  @Input() mode: string;
  @Input() set post(post: Post) {
    this._post = Object.assign({}, post);
  }
  @Output() protected submitPost = new EventEmitter<{ result: string, data?: any }>();
  @Output() protected cancelSubmitPost = new EventEmitter<null>();

  get post() {
    return this._post;
  }

  // TODO make it reactive forms
  constructor(private postService: PostService) { }

  onPreview(preview) {
    this.preview = preview;
  }

  onCancel(e) {
    this.cancelSubmitPost.emit();
  }

  onSubmit() {
    // TODO move toparents component
    if (this.mode === 'save') {
      this.savePost();
    } else if (this.mode === 'update') {
      this.updatePost();
    }
    return false;
  }

  savePost() {
    if (!this.submitted) {
      this.postService
        .savePost(this.post)
        .then(_ => this.success())
        .catch(err => this.error(err));
    }
  }

  updatePost() {
    if (!this.submitted) {
      this.postService
        .updatePost(this.post)
        .then(_ => this.success())
        .catch(err => this.error(err));
    }
  }

  success() {
    this.preview = false;
    this.submitted = false;
    this.submitPost.emit({ result: 'success', data: this.post });

  }

  error(err) {
    alert(err);
    this.submitted = false;
    this.submitPost.emit({ result: 'error', data: err });
  }

}
