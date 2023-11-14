import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ExistingBookingListComponent} from "./pages/existing-booking-list/existing-booking-list.component";

const routes: Routes = [
  {
    path: 'my-bookings',
    component: ExistingBookingListComponent,
  }
]
@NgModule({
  declarations: [
    ExistingBookingListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class BookingModule { }
