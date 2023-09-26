import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'peru',
    children: [
      {
        path: '',
        loadChildren: () => import('./public/public-layout.module').then(m => m.PublicLayoutModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'peru'
    , pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
