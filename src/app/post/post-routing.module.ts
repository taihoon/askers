import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserResolver } from '../auth/user.resolver';
import { ChannelGuard } from '../channel/channel.guard';
import { ChannelResolver } from '../channel/channel.resolver';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'channels/:channelCode',
        canActivate: [ ChannelGuard ],
        resolve: { user: UserResolver, channel: ChannelResolver },
        children: [
          { path: 'posts', component: PostListComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class PostRoutingModule { }
