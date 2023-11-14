import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Booking} from "../models/booking.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingService = environment.baseUrl + 'bookings'
  private base = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {
  }

  createBooking(booking: Booking): Observable<any> {
    return this.http.post<any>(`${this.base}`, booking);
  }
  getBookingByTourExperienceIdAndTouristId(tourExperienceId: number, touristId: string): Observable<Booking> {
    // @ts-ignore
    return this.http.get<Booking[]>(`${this.base}?tourExperienceId=${tourExperienceId}&touristId=${touristId}`)
      .pipe(
        map(bookings => (bookings && bookings.length > 0) ? bookings[0] : null)
      );
  }
}
