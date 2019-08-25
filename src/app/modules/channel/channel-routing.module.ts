import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'channels',
        component: ChannelListComponent,
        canActivate: [AngularFireAuthGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ChannelRoutingModule {}
