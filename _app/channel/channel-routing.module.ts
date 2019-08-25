import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ChannelListComponent } from '../../app/modules/channel/channel-list/channel-list.component';


import { AuthGuard } from '../auth/auth.guard';
import { ChannelGuard } from './channel.guard';
import { UserResolver } from '../auth/user.resolver';
import { NewChannelResolver, ChannelResolver } from './channel.resolver';
import { ChannelCreateComponent } from './channel-create/channel-create.component';
import { ChannelEditComponent } from './channel-edit/channel-edit.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'channels',
        // canActivate: [AuthGuard],
        // resolve: { user: UserResolver },
        children: [
          {
            path: '',
            component: ChannelListComponent
          },
          {
            path: 'new/edit',
            component: ChannelCreateComponent,
            resolve: { channel: NewChannelResolver }
          },
          {
            path: ':channelCode/edit',
            component: ChannelEditComponent,
            canActivate: [ChannelGuard],
            resolve: { channel: ChannelResolver }
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ChannelRoutingModule {}
