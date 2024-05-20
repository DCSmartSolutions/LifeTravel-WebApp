import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingService = environment.baseUrl + 'booking';

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<any> {
    return this.http.post<any>(`${this.bookingService}`, booking);
  }
  getBookingByTourPackageIdAndTouristId(
    tourPackageId: number,
    touristId: string,
  ): Observable<Booking> {
    // @ts-ignore
    return this.http.get<Booking[]>(
      `${this.bookingService}/package/${tourPackageId}/tourist/${touristId}`,
    );
  }
}
