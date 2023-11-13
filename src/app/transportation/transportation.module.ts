import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ExistingVehicleListComponent } from './pages/existing-vehicle-list/existing-vehicle-list.component';

const routes: Routes = [
  {
    path: 'my-vehicles',
    component: ExistingVehicleListComponent,
  }
]

@NgModule({
  declarations: [
    ExistingVehicleListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class TransportationModule { }
