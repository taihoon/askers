import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPost, Post } from '@app/core/models';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnChanges {
  @Input() post: NewPost | Post;
  @Output() submitPost = new EventEmitter<void>();
  form: FormGroup;

  get notice() { return this.form.get('notice'); }
  get contents() { return this.form.get('contents'); }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.post) {
      const v = Validators;
      const p = changes.post.currentValue as (NewPost | Post);
      this.form = this.fb.group({
        notice: [p.notice, [v.required]],
        contents: [p.contents, [v.required, v.minLength(2), v.maxLength(2000)]]
      });
    }
  }

  onSubmit() {
    this.post.notice = this.notice.value;
    this.post.contents = this.contents.value;
    this.submitPost.emit();
  }

}
