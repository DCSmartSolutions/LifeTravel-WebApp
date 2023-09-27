import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListPackagesComponent} from "./components/list-packages/list-packages.component";
import { SearchPlacesDialog } from './components/search-places.modal/search-places-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {SearchPackagesComponent} from "./components/search-packages/search-packages.component";


const routes: Routes = [
  {
    path: ':regionId',
    component: SearchPackagesComponent,
  }
]

@NgModule({
  declarations: [
    SearchPlacesDialog
  ],
  imports: [
    RouterModule.forChild(routes),
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage,
  ],
  exports: [RouterModule],
})
export class TourPackagesModule {
}
