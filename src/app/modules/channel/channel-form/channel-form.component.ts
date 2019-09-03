import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Channel, NewChannel } from '@app/core/models';
import { firestore } from 'firebase/app';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import parseISO from 'date-fns/parseISO';

const toISOLocalString = date => `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
const channelDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const start = parseISO(control.get('start').value);
  const end = parseISO(control.get('end').value);
  return (!isBefore(start, end) || !isAfter(end, Date.now())) ? { channelDate: true } : null;
};

@Component({
  selector: 'app-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.css']
})
export class ChannelFormComponent implements OnInit {
  @Input() channel: NewChannel | Channel;
  @Output() submitChannel = new EventEmitter<null>();
  form: FormGroup;
  get title() { return this.form.get('title'); }
  get code() { return this.form.get('code'); }
  get desc() { return this.form.get('desc'); }
  get start() { return this.form.get('start'); }
  get end() { return this.form.get('end'); }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    const v = Validators;
    const c = this.channel;
    this.form = this.fb.group({
      title: [c.title, [v.required, v.minLength(2), v.maxLength(200)]],
      code: [c.code, [v.required, v.minLength(2), v.maxLength(100)]],
      desc: [c.desc, [v.required, v.minLength(2), v.maxLength(2000)]],
      start: [toISOLocalString(c.start.toDate()), v.required],
      end: [toISOLocalString(c.end.toDate()), v.required]
    }, { validators: [channelDateValidator] });
  }

  onSubmit() {
    this.channel.title = this.title.value;
    this.channel.code = this.code.value;
    this.channel.desc = this.desc.value;
    this.channel.start = firestore.Timestamp.fromDate(parseISO(this.start.value));
    this.channel.end = firestore.Timestamp.fromDate(parseISO(this.end.value));
    this.submitChannel.emit();
  }

}
