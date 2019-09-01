import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'channels/:channelId/posts',
        component: PostListComponent,
        canActivate: [AngularFireAuthGuard]
      },
      // {
      //   path: 'channels/new',
      //   component: ChannelCreateComponent,
      //   canActivate: [AngularFireAuthGuard]
      // },
      // {
      //   path: 'channels/:channelId/edit',
      //   component: ChannelEditComponent,
      //   canActivate: [AngularFireAuthGuard]
      // },
    ])
  ],
  exports: [RouterModule]
})
export class PostRoutingModule {}
