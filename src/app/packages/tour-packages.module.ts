import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {SearchPackagesComponent} from "./pages/search-packages/search-packages.component";
import {FilterPackagesModal} from "./components/filter-packages-modal/filter-packages-modal.component";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import { SearchPlacesModalComponent } from './components/search-places-modal/search-places-modal.component';


const routes: Routes = [
  {
    path: '',
    component: SearchPackagesComponent,
  },
  {
    path: ':regionId',
    component: SearchPackagesComponent,
  }
]

@NgModule({
  declarations: [
    FilterPackagesModal,
    SearchPlacesModalComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage,
    MatSliderModule,
    MatInputModule,
    NgIf,
    FormsModule,
    MatCheckboxModule,
    NgForOf,
    MatIconModule,
  ],
  exports: [RouterModule],
})
export class TourPackagesModule {
}
