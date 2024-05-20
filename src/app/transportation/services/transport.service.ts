import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../iam/services/user.service';
import { VEHICLE_STATUS } from '../enums/vehicle-status.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  private base = environment.baseUrl + 'vehicles';
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}
  getAllTransportationsByAgencyId(
    status: VEHICLE_STATUS = VEHICLE_STATUS.OPERATIONAL,
  ): Observable<Vehicle[]> {
    const agencyId = this.userService.getUserIdFromCookies();
    return this.http.get<Vehicle[]>(
      `${this.base}/all-vehicles-by-agency-user-id-and-status/${agencyId}/${status}`,
    );
  }
  getTransportationById(transportId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.base}/${transportId}`);
  }
  modifyImage(transportId: number, image: string): Observable<any> {
    return this.http.put<any>(`${this.base}/img/${transportId}`, { image });
  }
  createTransportation(transport: Vehicle): Observable<any> {
    return this.http.post<any>(`${this.base}/create`, transport);
  }
  modifyTransportation(
    transportId: number,
    transport: Vehicle,
  ): Observable<any> {
    return this.http.put<any>(`${this.base}/modify/${transportId}`, transport);
  }
  assignVehicle(vehicleId: number, tourPackageId: number): Observable<any> {
    return this.http.put<any>(
      `${this.base}/assign-vehicle-to-tour-package/${vehicleId}/${tourPackageId}`,
      null,
    );
  }
  getAssignedVehiclesByTourPackageId(
    tourPackageId: number,
  ): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      `${this.base}/all-vehicles-by-tour-package/${tourPackageId}`,
    );
  }
  removeAssignedVehicle(
    vehicleId: number,
    tourPackageId: number,
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.base}/remove-vehicle-to-tour-package/${vehicleId}/${tourPackageId}`,
    );
  }
}
