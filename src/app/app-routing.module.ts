import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./identity-access-management/pages/login/login.component";

const routes: Routes = [
  {
    path: 'peru',
    children: [
      {
        path: '',
        loadChildren: () => import('./shared/shared-layout.module').then(m => m.SharedLayoutModule)
      }
    ]
  },
  {
    path: 'sign-in',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'sign-in'
    , pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
