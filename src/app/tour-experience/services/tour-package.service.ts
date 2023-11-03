import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TourPackage} from "../models/tour-package.model";

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private baseUrl = 'http://localhost:3000/';
  //private baseUrl = 'https://my-json-server.typicode.com/DominikMendoza/data/'; // -> typicode
  constructor(private http: HttpClient) { }
  getPackagesByRegionId(regionId: number): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.baseUrl}packages?regionId=${regionId}&visible=true`);
  }
  getPackageById(packageId: number): Observable<TourPackage> {
    return this.http.get<TourPackage>(`${this.baseUrl}packages/${packageId}`);
  }
  modifyImage(packageId: number, image: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}packages/${packageId}`, {img: image});
  }
  modifyPackage(packageId: number, tourPackage: TourPackage): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}packages/${packageId}`, tourPackage);
  }
  saveSchedule(packageId: number, schedule: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}packages/${packageId}`, {schedule: schedule});
  }
  createPackage(tourPackage: TourPackage): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}packages`, tourPackage);
  }

  getAllPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.baseUrl}packages?visible=true`);
  }
  getAllPackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.baseUrl}packages`);
  }
  getAllHiddenPackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.baseUrl}packages?visible=false`);
  }
  getAllVisiblePackagesByAgency(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(`${this.baseUrl}packages?visible=true`);
  }
  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}regions`);
  }

  getRegionById(regionId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}regions/${regionId}`);
  }
}
