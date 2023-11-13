import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Transport} from "../models/transport.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../identity-access-management/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private base = 'http://localhost:3000/tranportations';
  constructor(private http: HttpClient, private userService: UserService) { }
  getAllTransportationsByAgencyId(): Observable<Transport[]> {
    const agencyId = this.userService.getUserIdFromCookies();
    return this.http.get<Transport[]>(`${this.base}?agencyId=${agencyId}`);
  }
  createTransportation(transport: Transport): Observable<any> {
    return this.http.post<any>(`${this.base}`, transport);
  }
  modifyTransportation(transportId: number, transport: Transport): Observable<any> {
    return this.http.patch<any>(`${this.base}/${transportId}`, transport);
  }
}
