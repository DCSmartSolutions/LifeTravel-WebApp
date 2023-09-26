import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import { ListPackagesComponent } from './packages/components/list-packages/list-packages.component';
import { SearchPackagesComponent } from './packages/components/search-packages/search-packages.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListPackagesComponent },
  { path: 'search', component: SearchPackagesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    }),
  ],
})
export class AppRoutingModule { }
