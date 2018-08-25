import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { SharedModule } from '../shared/shared.module';
import { PostResolver } from './post.resolver';
import { PostRoutingModule } from './post-routing.module';
import { PostService } from './post.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    SharedModule,
    PostRoutingModule
  ],
  declarations: [
    PostFormComponent,
    PostListComponent,
    PostDetailComponent
  ],
  providers: [
    PostResolver,
    PostService
  ]
})
export class PostModule { }
