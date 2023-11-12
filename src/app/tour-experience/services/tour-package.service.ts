import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TourPackage} from "../models/tour-package.model";
import {environment} from "../../../environments/environment";
import {Activity} from "../models/activity.model";
import {CookieService} from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private base = 'http://localhost:3000/';
  private activityService = environment.baseUrl+'activities'
  private headers:HttpHeaders = new HttpHeaders ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  constructor(private http: HttpClient) { }
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.activityService}`, {headers: this.headers});
  }
  getPackagesByRegionId(regionId: number): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}packages?regionId=${regionId}&visible=true`);
  }
  getPackageById(packageId: number): Observable<TourPackage> {
    return this.http.get<TourPackage>(`${this.base}packages/${packageId}`);
  }
  modifyImage(packageId: number, image: any): Observable<any> {
    return this.http.patch<any>(`${this.base}packages/${packageId}`, {img: image});
  }
  modifyPackage(packageId: number, tourPackage: TourPackage): Observable<any> {
    return this.http.patch<any>(`${this.base}packages/${packageId}`, tourPackage);
  }
  saveSchedule(packageId: number, schedule: any): Observable<any> {
    return this.http.patch<any>(`${this.base}packages/${packageId}`, {schedule: schedule});
  }
  createPackage(tourPackage: TourPackage): Observable<any> {
    return this.http.post<any>(`${this.base}packages`, tourPackage);
  }

  getAllPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}packages?visible=true`);
  }
  getAllPackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}packages`);
  }
  getAllHiddenPackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}packages?visible=false`);
  }
  getAllVisiblePackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}packages?visible=true`);
  }
  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}regions`);
  }

  getRegionById(regionId: number): Observable<any> {
    return this.http.get<any>(`${this.base}regions/${regionId}`);
  }
}
