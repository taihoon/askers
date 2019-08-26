import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Channel, NewChannel } from '@app/core/models/channel';

@Component({
  selector: 'app-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.css']
})
export class ChannelFormComponent implements OnInit {
  @Input() channel: NewChannel | Channel;
  channelForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.channelForm = this.fb.group({
      title: [this.channel.title],
      code: [this.channel.code],
      desc: [this.channel.desc],
      start: [this.channel.start.toMillis()],
      end: [this.channel.end.toMillis()]
    });
  }

  onSubmit() {
    console.log('channel submit');
  }

}
