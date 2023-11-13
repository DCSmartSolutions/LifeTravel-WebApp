import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AssignedVehicle, Vehicle} from "../models/vehicle.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../identity-access-management/services/user.service";
import {VEHICLE_STATUS} from "../enums/vehicle-status.enum";

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private base = 'http://localhost:3000/transportations';
  private assignedVehicleService = 'http://localhost:3000/assignedVehicles';
  constructor(private http: HttpClient, private userService: UserService) { }
  getAllTransportationsByAgencyId(status: VEHICLE_STATUS = VEHICLE_STATUS.OPERATIONAL): Observable<Vehicle[]> {
    const agencyId = this.userService.getUserIdFromCookies();
    return this.http.get<Vehicle[]>(`${this.base}?agencyId=${agencyId}&status=${status}`);
  }
  getTransportationById(transportId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.base}/${transportId}`);
  }
  getOperationalTransportationsByAgencyId(): Observable<Vehicle[]> {
    const agencyId = this.userService.getUserIdFromCookies();
    return this.http.get<Vehicle[]>(`${this.base}?agencyId=${agencyId}&status=${VEHICLE_STATUS.OPERATIONAL}`);
  }
  modifyImage(transportId: number, image: string): Observable<any> {
    return this.http.patch<any>(`${this.base}/${transportId}`, {img: image});
  }
  createTransportation(transport: Vehicle): Observable<any> {
    return this.http.post<any>(`${this.base}`, transport);
  }
  modifyTransportation(transportId: number, transport: Vehicle): Observable<any> {
    return this.http.patch<any>(`${this.base}/${transportId}`, transport);
  }
  assignVehicle(assignedVehicle: AssignedVehicle): Observable<any> {
    return this.http.post<any>(`${this.assignedVehicleService}`, assignedVehicle);
  }
  getAssignedVehiclesByTourPackageId(tourPackageId: number): Observable<AssignedVehicle[]> {
    return this.http.get<AssignedVehicle[]>(`${this.assignedVehicleService}?tourPackageId=${tourPackageId}`);
  }
  removeAssignedVehicle(assignedVehicleId: number): Observable<any> {
    return this.http.delete<any>(`${this.assignedVehicleService}/${assignedVehicleId}`);
  }
  removeAssignedVehicleByVehicleIdAndTourPackageId(vehicleId: number, tourPackageId: number): Observable<any> {
    return this.http.delete<any>(`${this.assignedVehicleService}?vehicleId=${vehicleId}&tourPackageId=${tourPackageId}`);
  }
  getAssignedVehicleByVehicleIdAndTourPackageId(vehicleId: number, tourPackageId: number): Observable<AssignedVehicle> {
    return this.http.get<AssignedVehicle>(`${this.assignedVehicleService}?vehicleId=${vehicleId}&tourPackageId=${tourPackageId}`);
  }
}
