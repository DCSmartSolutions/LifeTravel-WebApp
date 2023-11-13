import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Auth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private cookieService: CookieService, private auth: Auth) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth.currentUser?.getIdToken(true).then(
      (token: string) => {
        console.log(token)
        this.cookieService.set('JSESSIONID', token);
      }
    )
    const token = this.cookieService.get('JSESSIONID');
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    })
    return next.handle(jwtToken);
  }
}
