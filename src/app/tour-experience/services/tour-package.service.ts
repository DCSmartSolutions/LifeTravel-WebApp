import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TourPackage} from "../models/tour-package.model";
@Injectable({
  providedIn: 'root'
})
export class TourPackageService {

   private base = 'http://localhost:3000/packages';
  //private base = 'http://localhost:8080/tour-packages';

  constructor(private http: HttpClient) { }
  getPackagesByRegionId(regionId: number): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}?regionId=${regionId}&visible=true`);
  }
  getPackageById(packageId: number): Observable<TourPackage> {
    return this.http.get<TourPackage>(`${this.base}/${packageId}`);
  }
  modifyImage(packageId: number, image: any): Observable<any> {
    return this.http.patch<any>(`${this.base}/${packageId}`, {img: image});
  }
  modifyPackage(packageId: number, tourPackage: TourPackage): Observable<any> {
    return this.http.patch<any>(`${this.base}/${packageId}`, tourPackage);
  }
  saveSchedule(tourPackageId: number, schedule: any, visible: boolean): Observable<any> {
    return this.http.patch<any>(`${this.base}?tourPackageId=${tourPackageId}`, {
      schedule: schedule,
      visible: visible
    }); //modify visible of tourPackage
  }
  createPackage(tourPackage: TourPackage): Observable<any> {
    return this.http.post<any>(`${this.base}`, tourPackage);
  }
  getAllPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}?visible=true`);
  }
  getAllPackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}`);
  }
  getAllHiddenPackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}?visible=false`);
  }
  getAllVisiblePackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.base}?visible=true`);
  }
  getRegionById(regionId: number): Observable<any> {
    return this.http.get<any>(`${this.base}regions/${regionId}`);
  }
}
