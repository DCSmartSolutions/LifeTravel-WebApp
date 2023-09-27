import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getPackagesByRegionId(region_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/packages?region_id=${region_id}`);
  }

  getAllPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/packages`);
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/regions`);
  }

  getRegionById(region_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/regions/${region_id}`);
  }
}
