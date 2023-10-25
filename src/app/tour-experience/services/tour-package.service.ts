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
