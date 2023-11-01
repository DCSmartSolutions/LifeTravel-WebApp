export class HourRange {
  start: Time = new Time();
  end: Time = new Time();
}

export class Schedule {
  day: string = '';
  hourRange: HourRange = new HourRange();
}
export class Time{
  hour: string = '';
  minute: string = '';
  dayTime: string = '';
}
