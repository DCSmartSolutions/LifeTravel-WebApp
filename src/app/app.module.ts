import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PackageSearchComponent } from './tour-experience/pages/package-search/package-search.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './public/pages/home/home.component';
import { TourPackagesModule } from './tour-experience/tour-packages.module';
import { IamModule } from './iam/iam.module';
import { TokenInterceptorService } from './iam/pipelines/guard/token-interceptor.service';
import { PinkToast } from './shared/widgets/customToast.component';
import { ChartModule } from 'angular-highcharts';
import { DashboardComponent } from './tour-experience/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PackageSearchComponent,
    HomeComponent,
    PinkToast,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot({
      toastComponent: PinkToast,
    }),
    AppRoutingModule,
    RouterOutlet,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    TourPackagesModule,
    IamModule,
    ChartModule,
  ],
  exports: [DashboardComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
