import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ChannelCreateComponent } from './channel-create/channel-create.component';
import { ChannelListComponent } from './channel-list/channel-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'channels',
        component: ChannelListComponent,
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'channels/new',
        component: ChannelCreateComponent,
        canActivate: [AngularFireAuthGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ChannelRoutingModule {}
