import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SaveUser, User} from "../models/user.model";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl + 'users'

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getUserIdFromCookies(): string {
    return this.cookieService.get('JUID');
  }

  getUserById(id: string) {
    return this.http.get<User>(`${this.baseUrl}/login/${id}`)
  }

  registerTourist(user: SaveUser, token: string) {
    //ADD authorization header bearer token
    return this.http.post(`${this.baseUrl}/register/tourist`, user,
      {headers: {'Authorization': `Bearer ${token}`}})

  }

  registerAgency(user: SaveUser, token: string) {
    return this.http.post(`${this.baseUrl}/register/agency`, user,
      {headers: {'Authorization': `Bearer ${token}`}})
  }
}
