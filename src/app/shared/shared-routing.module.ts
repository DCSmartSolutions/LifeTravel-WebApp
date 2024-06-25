import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from '../public/pages/home/home.component';
import { AdminLayoutComponent } from './pages/layout/admin-layout.component';
import { DashboardComponent } from '../tour-experience/pages/dashboard/dashboard.component';
import { ReportsComponent } from '../reporting/pages/reports/reports.component';

const childrenRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tour-packages',
    loadChildren: () =>
      import('../tour-experience/tour-packages.module').then(
        (m) => m.TourPackagesModule,
      ),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('../booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'transportation',
    loadChildren: () =>
      import('../transportation/transportation.module').then(
        (m) => m.TransportationModule,
      ),
  },
  {
    path: 'reports',
    component: ReportsComponent,
  }
];

const routes: Route[] = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: childrenRoutes,
  },
  {
    path: 'no-menu',
    component: AdminLayoutComponent,
    data: { showMenu: false },
    children: childrenRoutes,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
