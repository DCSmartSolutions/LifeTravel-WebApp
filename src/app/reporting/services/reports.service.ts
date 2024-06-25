import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Report } from '../models/report.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = environment.baseUrl + 'reports';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  getReports() {
    return this.http.get<Report[]>(this.baseUrl);
  }

  getReportByAgencyId(agencyId: string) {
    return this.http.get<Report[]>(`${this.baseUrl}/agency/${agencyId}`);
  }

  createReport(agencyId: string, tourPackageIds: number[], token: string) {
    const report = {
      agencyId: +agencyId,
      tourPackageIds: tourPackageIds,
    };
    console.log(report);
    return this.http.post<Report>(this.baseUrl, report, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
