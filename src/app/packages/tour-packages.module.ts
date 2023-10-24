import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {SearchPackagesComponent} from "./pages/search-packages/search-packages.component";
import {FilterPackagesModal} from "./components/filter-packages-modal/filter-packages-modal.component";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {SearchPlacesModalComponent} from './components/search-places-modal/search-places-modal.component';
import {
  ExistingTourPackagesListComponent
} from './pages/existing-tour-packages-list/existing-tour-packages-list.component';
import {ListPackagesComponent} from "./components/list-packages/list-packages.component";
import { TourPackageDetailComponent } from './pages/tour-package-detail/tour-package-detail.component';


const routes: Routes = [
  {
    path: 'my-tour-packages',
    component: ExistingTourPackagesListComponent,
  },
  {
    path: 'detail/:packageId',
    component: TourPackageDetailComponent,
  },
  {
    path:'add-tour-package',
    component: TourPackageDetailComponent,
  },
  {
    path: ':regionId',
    component: SearchPackagesComponent,
  },
  {
    path: '',
    component: SearchPackagesComponent,
  },
]

@NgModule({
  declarations: [
    FilterPackagesModal,
    SearchPlacesModalComponent,
    ExistingTourPackagesListComponent,
    ListPackagesComponent,
    TourPackageDetailComponent,
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
    NgClass,
    ReactiveFormsModule,
  ],
  exports: [RouterModule, ListPackagesComponent],
})
export class TourPackagesModule {
}
