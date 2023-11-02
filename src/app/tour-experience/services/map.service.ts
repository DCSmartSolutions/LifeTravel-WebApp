import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl = 'https://geocode.maps.co/reverse?';
  constructor(private http: HttpClient) { }
  getDisplayName(longitude: number, latitude: number): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}lat=${latitude}&lon=${longitude}`).toPromise();
  }
}
