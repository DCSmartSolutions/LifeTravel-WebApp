import {Activity} from "./activity.model";
import {LocationName, Location} from "./map.model";
import {Schedule} from "./time-picker.model";

export class TourPackage {
  id: number = 0;
  img: string | null = null;
  destiny: string = '';
  title: string = '';
  description: string = '';
  agencyId: string = '';
  price: number = 0;
  stars: number = 0;
  regionId: number = 0;
  activities: Activity[] = [];
  visible: boolean = false;
  meetingPoint: Location | null = null;
  meetingPointLatitude: number | null = null;
  meetingPointLongitude: number | null = null;
  destinations: LocationName[] = [];
  schedule: Schedule[] = [];
}
