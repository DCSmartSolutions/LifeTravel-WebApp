import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private baseUrl = 'http://localhost:3000/';
  //private baseUrl = 'https://my-json-server.typicode.com/DominikMendoza/data/'; // -> typicode
  constructor(private http: HttpClient) { }
  getPackagesByRegionId(regionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}packages?regionId=${regionId}`);
  }
  getPackageById(packageId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}packages/${packageId}`);
  }

  getAllPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}packages`);
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}regions`);
  }

  getRegionById(regionId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}regions/${regionId}`);
  }
}
