import {HourRange} from "../../tour-experience/models/time-picker.model";

export class Booking {
  id: number = 0;
  tourPackageId: number = 0;
  touristId: string = '';
  selectedDate: Date = new Date();
  hourRange: HourRange | undefined = new HourRange() ;
}
