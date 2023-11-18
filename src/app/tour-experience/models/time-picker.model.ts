export class HourRange {
  start: Time = new Time();
  end: Time = new Time();
}

export class Schedule {
  id: number = 0;
  day: string = '';
  selected: boolean = false;
  hourRange: HourRange = new HourRange();
}
export class Time{
  hour: string = '';
  minute: string = '';
  dayTime: string = '';
}
