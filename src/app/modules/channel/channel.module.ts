import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelListComponent } from './channel-list/channel-list.component';

@NgModule({
  imports: [
    CommonModule,
    ChannelRoutingModule
  ],
  declarations: [
    ChannelListComponent
  ]
})
export class ChannelModule { }
