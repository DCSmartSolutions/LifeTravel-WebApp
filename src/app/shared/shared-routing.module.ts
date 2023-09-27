import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {HomeComponent} from "../public/pages/home/home.component";
import {AdminLayoutComponent} from "./pages/admin-layout/admin-layout.component";

const childrenRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tour-packages',
    loadChildren: () => import('../packages/tour-packages.module').then(m => m.TourPackagesModule)
  },
];

const routes: Route[] = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: childrenRoutes
  },
  {
    path: 'no-menu',
    component: AdminLayoutComponent,
    data: {showMenu: false},
    children: childrenRoutes
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SharedRoutingModule { }
