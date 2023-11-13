import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TourExperience} from "../models/tour-experience.model";

@Injectable({
  providedIn: 'root'
})
export class TourExperienceService {
  private base = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  saveSchedule(tourPackageId: number, schedule: any, visible: boolean): Observable<any> {
    return this.http.patch<any>(`${this.base}tourExperiences?tourPackageId=${tourPackageId}`, {
      schedule: schedule,
      visible: visible
    }); //modify visible of tourPackage
  }

  getSchedule(tourPackageId: number): Observable<TourExperience> {
    return this.http.get<any>(`${this.base}tourExperiences?tourPackageId=${tourPackageId}`); //if not exist, create new TourExperience and return it
  }
}
