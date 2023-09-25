import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import { ListPackagesComponent } from './packages/list-packages/list-packages.component';

const routes: Routes = [
  {
    path: '',
    component: ListPackagesComponent,
  },
  {
    path: 'home', 
    component: ListPackagesComponent, 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    }),
  ],
})
export class AppRoutingModule { }
