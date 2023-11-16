import {Activity} from "./activity.model";
import {LocationName, Location} from "./map.model";
import {Schedule} from "./time-picker.model";

export class TourPackage {
  id: number = 0;
  imgUrl: string | null = null;
  destiny: string = '';
  title: string = '';
  description: string = '';
  agencyId: string = '';
  price: number = 0;
  rating: number = 0;
  regionId: number = 0;
  activities: Activity[] = [];
  visible: boolean = false;
  meetingPointLatitude: number | null = null;
  meetingPointLongitude: number | null = null;
  destinations: LocationName[] = [];
  schedule: Schedule[] = [];
}
