import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./iam/pipelines/guard/auth.guard";

const routes: Routes = [
  {
    path: 'peru',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./shared/shared-layout.module').then(m => m.SharedLayoutModule)
      }
      ]
  },
  {
    path: 'authentication',
    children: [
      {
        path: '',
        loadChildren: () => import('./iam/iam.module').then(m => m.IamModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
