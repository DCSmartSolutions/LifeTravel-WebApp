import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
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
    path: 'authentication',
    children: [
      {
        path: '',
        loadChildren: () => import('./identity-access-management/identity-access-management.module').then(m => m.IdentityAccessManagementModule)
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
