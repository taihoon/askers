import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Channel, NewChannel } from '@app/core/models';

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
    const toISOLocalString = date => `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    this.channelForm = this.fb.group({
      title: [this.channel.title],
      code: [this.channel.code],
      desc: [this.channel.desc],
      start: [toISOLocalString(this.channel.start.toDate())],
      end: [toISOLocalString(this.channel.end.toDate())]
    });
  }

  onSubmit() {
    console.log('channel submit');
  }

}
