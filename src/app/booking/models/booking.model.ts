import {HourRange} from "../../tour-experience/models/time-picker.model";
import {BOOKING_STATUS} from "../enums/booking-status.enum";

export class Booking {
  id: number = 0;
  tourPackageId: number = 0;
  touristId: string = '';
  date: Date = new Date();
  hourRange: HourRange | undefined = new HourRange() ;
}
