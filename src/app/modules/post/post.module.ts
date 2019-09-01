import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from '@app/modules/post/post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';


@NgModule({
  declarations: [PostListComponent, PostFormComponent],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
