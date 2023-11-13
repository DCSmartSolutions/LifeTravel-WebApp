import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TourPackage} from "../models/tour-package.model";
@Injectable({
  providedIn: 'root'
})
export class TourPackageService {

  private base = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
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
  getRegionById(regionId: number): Observable<any> {
    return this.http.get<any>(`${this.base}regions/${regionId}`);
  }
}
