import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.css']
})
export class ChannelFormComponent implements OnInit {
  @Input() mode: string;
  @Input() channel: Channel;

  channelForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private channelService: ChannelService) {
  }

  get code() {
    return this.channelForm.get('code');
  }

  get title() {
    return this.channelForm.get('title');
  }

  get desc() {
    return this.channelForm.get('desc');
  }

  get start() {
    return this.channelForm.get('start');
  }

  get end() {
    return this.channelForm.get('end');
  }

  ngOnInit() {
    this.channelForm = this.fb.group({
      code: [
        {
          value: this.channel.code,
          disabled: this.mode === 'edit'
        },
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
        this.validateCode.bind(this)
      ],
      title: [
        this.channel.title,
        [Validators.required, Validators.minLength(4), Validators.maxLength(100)]
      ],
      desc: [
        this.channel.desc,
        [Validators.required, Validators.minLength(4), Validators.maxLength(2048)]
      ],
      start: [
        this.channel.start,
        [Validators.required]
        // {
        //   value:  this.channel.start,
        //   disabled: this.mode === 'edit'
        // },
        // [Validators.required]
      ],
      end: [
        this.channel.end,
        [Validators.required]
      ]
    }, {
      validator: [
        this.validateDate.bind(this)
      ]
    });

    [this.start, this.end].forEach(ctl => {
      ctl.valueChanges.pipe(
        map(date => firebase.firestore.Timestamp.fromDate(new Date(date)))
      ).subscribe(date => ctl.setValue(date, { emitEvent: false }));
    });
  }

  protected validateCode(control: AbstractControl): { [key: string]: any } | null {
    return this.channelService
    .isExistChannelByCode(control.value)
    .pipe(
      map(isExist => isExist ? { alreadyInUse: true } : null)
    );
  }

  protected validateDate(control: AbstractControl): { [key: string]: any } | null {
    let validation = null;
    const startCtl = control.get('start');
    const endCtl = control.get('end');

    const currentDate = new Date();
    const startDate = startCtl.value.toDate();
    const endDate = endCtl.value.toDate();

    const minDate = new Date(currentDate);
    minDate.setDate(currentDate.getDate() - 1);
    const maxDate = new Date(currentDate);
    maxDate.setMonth(currentDate.getMonth() + 3);

    if (startDate < minDate && this.mode !== 'edit') {
      startCtl.setErrors({ 'mindate' : true });
      validation = { 'minStartdate': true };
    } else if (startDate >= endDate) {
      startCtl.setErrors({ 'maxdate' : true });
      validation = { 'maxStartdate': true };
    } else {
      startCtl.setErrors(null);
    }

    if (endDate < startDate) {
      endCtl.setErrors({ 'mindate' : true });
      validation = { 'minEnddate': true };
    } else if (endDate >= maxDate) {
      endCtl.setErrors({ 'maxdate' : true });
      validation = { 'maxEnddate': true };
    } else {
      endCtl.setErrors(null);
    }

    return validation;
  }

  onSubmit() {
    if (!this.submitted) {
      this.submitted = true;
      const channel: Channel = Object.assign(this.channel, this.channelForm.value);

      // TODO move to parent component
      if (!channel.id) {
        this.channelService
          .createChannel(channel)
          .then(
            _ => this.router.navigate(['/channels', channel.code, 'posts'])
          );
      } else {
        const updatedChannel = {
          title: channel.title,
          desc: channel.desc,
          start: channel.start,
          end: channel.end
        };

        this.channelService
          .updateChannel(channel.id, updatedChannel)
          .then(
            _ => this.router.navigate(['/channels'])
          );
      }
    }
  }

}
