import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { SharedModule } from '../shared/shared.module';
import { NewPostResolver, PostResolver } from './post.resolver';
import { PostRoutingModule } from './post-routing.module';
import { PostService } from './post.service';
import { PostSubscribeService } from './post-subscribe.service';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ReplyListComponent } from './reply-list/reply-list.component';
import { ReplyDetailComponent } from './reply-detail/reply-detail.component';

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
    PostDetailComponent,
    ReplyListComponent,
    ReplyDetailComponent
  ],
  providers: [
    PostResolver,
    NewPostResolver,
    PostService,
    PostSubscribeService
  ]
})
export class PostModule {}
