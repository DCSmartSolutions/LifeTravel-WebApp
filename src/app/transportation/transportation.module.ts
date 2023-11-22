import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { VehiclesGridComponent } from './components/vehicle-grid/vehicles-grid.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatChipsModule} from "@angular/material/chips";
import { VehicleInfoComponent } from './pages/vehicle-info/vehicle-info.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddVehicleModalComponent } from './components/add-vehicle-modal/add-vehicle-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";

const routes: Routes = [
  {
    path: 'my-vehicles',
    component: VehicleListComponent,
  },
  {
    path: 'vehicle-info/:vehicleId',
    component: VehicleInfoComponent,
  },
  {
    path: 'add-vehicle',
    component: VehicleInfoComponent,
  }
]

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleCardComponent,
    VehiclesGridComponent,
    VehicleInfoComponent,
    AddVehicleModalComponent
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
    MatDialogModule,
    MatRadioModule,
    FormsModule,
  ]
})
export class TransportationModule { }
