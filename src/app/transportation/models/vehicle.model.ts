import { VEHICLE_STATUS } from '../enums/vehicle-status.enum';

export class Vehicle {
  id: number = 0;
  brand: string = '';
  model: string = '';
  plate: string = '';
  capacity: number = 0;
  agencyId: string = '';
  driverName: string = '';
  weight: number = 0;
  img: string | null = null;
  status: VEHICLE_STATUS = VEHICLE_STATUS.OPERATIONAL;
}
