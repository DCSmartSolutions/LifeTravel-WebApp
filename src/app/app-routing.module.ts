import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: 'home',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./packages/tour-packages.module').then(m => m.TourPackagesModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home'
    , pathMatch: 'full'
  }
  // {
  //   path: 'home',
  //   component: ListPackagesComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
