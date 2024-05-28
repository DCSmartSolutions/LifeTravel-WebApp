import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private chatCompletionService = environment.baseUrl + 'chat-completions';

  constructor(private http: HttpClient) {}

  getChatResponse(message: string): Observable<string> {
    return this.http
      .post(this.chatCompletionService, message, { responseType: 'text' })
      .pipe(
        tap((response) => {
          console.log('Respuesta del servidor:', response);
        }),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error: ${error.status}, Mensaje: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
