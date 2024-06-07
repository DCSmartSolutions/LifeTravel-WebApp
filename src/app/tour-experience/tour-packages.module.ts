import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  SlicePipe,
} from '@angular/common';
import { PackageSearchComponent } from './pages/package-search/package-search.component';
import { PackageFilterModal } from './components/package-filter-modal/package-filter-modal.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PlaceSearchModalComponent } from './components/place-search-modal/place-search-modal.component';
import { PackageListComponent } from './pages/package-list/package-list.component';
import { PackageGridComponent } from './components/package-grid/package-grid.component';
import { PackageInfoComponent } from './pages/package-info/package-info.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MapComponent } from './components/map/map.component';
import { SharedLayoutModule } from '../shared/shared-layout.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PackageCardComponent } from './components/package-card/package-card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'my-packages',
    component: PackageListComponent,
  },
  {
    path: ':detail-type/:packageId',
    component: PackageInfoComponent,
  },
  {
    path: 'add-tour-package',
    component: PackageInfoComponent,
  },
  {
    path: ':regionId',
    component: PackageSearchComponent,
  },
  {
    path: '',
    component: PackageSearchComponent,
  },
];

@NgModule({
  declarations: [
    PackageFilterModal,
    PlaceSearchModalComponent,
    PackageListComponent,
    PackageGridComponent,
    PackageInfoComponent,
    MapComponent,
    PackageCardComponent,
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
    SlicePipe,
    MatSlideToggleModule,
    SharedLayoutModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
  exports: [RouterModule, PackageGridComponent],
})
export class TourPackagesModule {}
