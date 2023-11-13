import {HourRange} from "../../tour-experience/models/time-picker.model";

export class Booking {
  id: number = 0;
  tourExperienceId: number = 0;
  touristId: string = '';
  date: Date = new Date();
  hourRange: HourRange | undefined = new HourRange() ;
}
