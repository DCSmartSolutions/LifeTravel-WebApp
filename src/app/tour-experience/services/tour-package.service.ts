import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TourPackage} from "../models/tour-package.model";
import {environment} from "../../../environments/environment";
import {Schedule} from "../models/time-picker.model";
import {UserService} from "../../identity-access-management/services/user.service";
import {Department} from "../models/department.model";
@Injectable({
  providedIn: 'root'
})
export class TourPackageService {

   // private base = 'http://localhost:3000/packages';
   private _departmentService =  environment.baseUrl + 'departments';
  private _tourPackageService = environment.baseUrl + 'tour-packages';
  private _scheduleService = environment.baseUrl + 'schedules';
  private _regionService = environment.baseUrl + 'regions';

  constructor(private http: HttpClient,
              private userService: UserService) { }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this._departmentService}`);
  }
  getPackagesByRegionId(regionId: number): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this._tourPackageService}/region/${regionId}`);
  }
  getPackageById(packageId: number): Observable<TourPackage> {
    return this.http.get<TourPackage>(`${this._tourPackageService}/${packageId}`);
  }
  modifyImage(packageId: number, image: string): Observable<any> {
    return this.http.put<any>(`${this._tourPackageService}/img/${packageId}`, {imgUrl: image});
  }
  modifyPackage(packageId: number, tourPackage: TourPackage): Observable<any> {
    return this.http.put<any>(`${this._tourPackageService}/${packageId}`, tourPackage);
  }
  saveSchedule(tourPackageId: number, schedule: Schedule[]): Observable<any> {
    return this.http.post<any>(`${this._scheduleService}/package/${tourPackageId}`, schedule) //modify visible of tourPackage
  }
  getScheduleByPackageId(packageId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this._scheduleService}/package/${packageId}`);
  }
  createPackage(tourPackage: TourPackage): Observable<any> {
    return this.http.post<any>(`${this._tourPackageService}`, tourPackage);
  }
  getAllPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this._tourPackageService}`);
  }
  getAllPackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this._tourPackageService}/agency/${this.userService.getUserIdFromCookies()}`);
  }
  getAllHiddenPackagesByAgency(): Observable<TourPackage[]> {
    const agencyId = this.userService.getUserIdFromCookies();
    return this.http.get<TourPackage[]>(`${this._tourPackageService}/all-hidden-packages-by-agency/${agencyId}`);
  }
  getAllVisiblePackagesByAgency(): Observable<TourPackage[]> {
    const agencyId = this.userService.getUserIdFromCookies();
    return this.http.get<TourPackage[]>(`${this._tourPackageService}/all-visible-packages-by-agency/${agencyId}`);
  }
  getRegionById(regionId: number): Observable<any> {
    return this.http.get<any>(`${this._regionService}/${regionId}`);
  }
}
