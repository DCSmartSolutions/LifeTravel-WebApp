import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { FirebaseAuthCustomService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private fireAuthCustomService: FirebaseAuthCustomService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('JSESSIONID');
    if (!token) {
      this.router.navigate(['/authentication']);
    }
    if (this.isTokenExpired(token)) {
      return from(this.fireAuthCustomService.refreshToken()).pipe(
        switchMap((response: any) => {
          const jwtToken = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + response.user.accessToken,
            },
          });

          return next.handle(jwtToken);
        }),
        catchError((error) => {
          this.cookieService.delete('JSESSIONID', '/');
          this.cookieService.delete('JUID', '/');
          return throwError(error);
        }),
      );
    }
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });

    return next.handle(jwtToken);
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token);

    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();

    return expirationDate < currentDate;
  }

  private decodeToken(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = atob(payloadBase64);
      return JSON.parse(payload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
