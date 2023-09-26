import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListPackagesComponent} from "./components/list-packages/list-packages.component";


const routes: Routes = [
  {
    path: '',
    component: ListPackagesComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TourPackagesModule {
}
