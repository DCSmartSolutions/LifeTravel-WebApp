import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListPackagesComponent} from "./components/list-packages/list-packages.component";
import { SearchPlacesModalComponent } from './components/search-places.modal/search-places.modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


const routes: Routes = [
  {
    path: '',
    component: ListPackagesComponent,
  }
]

@NgModule({
  declarations: [
    SearchPlacesModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
})
export class TourPackagesModule {
}
