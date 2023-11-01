import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Time} from "../../../tour-experience/models/time-picker.model";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})

export class TimePickerComponent {
  hourOptions: any[] = [];
  minuteOptions: string[] = ['00', '15', '30', '45'];
  dayTimeOptions: string[] = ['AM', 'PM'];
  @Input() time: Time = { hour: '', minute: '', dayTime: '' };

  @Output() timeChangedEvent = new EventEmitter<Time>();
  constructor() {
    for (let i = 0; i < 24; i++) {
      this.hourOptions.push(
        {
          value: i.toString(),
          label: i < 10 ? '0' + i.toString() : i.toString()
        }
      );
    }
  }

  sendTime() {
    console.log(this.time);
    this.timeChangedEvent.emit(this.time);
  }
  get isInvalid() {
    return this.time.hour === '' || this.time.minute === '' || this.time.dayTime === '';
  }
}
