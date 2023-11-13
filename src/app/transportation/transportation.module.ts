import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ExistingVehicleListComponent } from './pages/existing-vehicle-list/existing-vehicle-list.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatChipsModule} from "@angular/material/chips";
import { VehicleDetailComponent } from './pages/vehicle-detail/vehicle-detail.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: 'my-vehicles',
    component: ExistingVehicleListComponent,
  },
  {
    path: 'vehicle-detail/:vehicleId',
    component: VehicleDetailComponent,
  }
]

@NgModule({
  declarations: [
    ExistingVehicleListComponent,
    VehicleCardComponent,
    VehiclesListComponent,
    VehicleDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgIf,
    SlicePipe,
    NgClass,
    NgForOf,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ]
})
export class TransportationModule { }
