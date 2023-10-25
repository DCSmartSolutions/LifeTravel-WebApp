export class TourPackage {
  id: number = 0;
  img: string | null = null;
  destiny: string = '';
  title: string = '';
  description: string = '';
  agency: string = '';
  price: number = 0;
  stars: number = 0;
  regionId: number = 0;
  visible: boolean = false;
  meetingPoint: Location | null = null;
  meetingPointLatitude: number | null = null;
  meetingPointLongitude: number | null = null;
}

export class Location{
  latitude: number;
  longitude: number;
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
