import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelFormComponent } from './channel-form/channel-form.component';
import { ChannelCreateComponent } from './channel-create/channel-create.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelEditComponent } from './channel-edit/channel-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChannelRoutingModule
  ],
  declarations: [
    ChannelFormComponent,
    ChannelCreateComponent,
    ChannelListComponent,
    ChannelEditComponent
  ]
})
export class ChannelModule { }
