import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    }),
  ],
})
export class AppRoutingModule { }
