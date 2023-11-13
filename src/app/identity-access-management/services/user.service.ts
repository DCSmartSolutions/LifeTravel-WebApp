import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl+'users'
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUserId(): string {
    return this.cookieService.get('JUID');
  }
}
