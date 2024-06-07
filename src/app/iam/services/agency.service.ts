import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Agency } from '../models/agency.model';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private baseUrl = environment.baseUrl + 'agencies';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  registerAgencyWithUserId(userId: string, agency: Agency, token: string) {
    return this.http.post(`${this.baseUrl}/register/${userId}`, agency, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
