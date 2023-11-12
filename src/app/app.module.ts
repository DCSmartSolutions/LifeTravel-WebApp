import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {SearchPackagesComponent} from './tour-experience/pages/search-packages/search-packages.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgxPermissionsModule} from "ngx-permissions";
import {ToastrModule} from "ngx-toastr";
import {HomeComponent} from './public/pages/home/home.component';
import {TourPackagesModule} from "./tour-experience/tour-packages.module";
import {IdentityAccessManagementModule} from "./identity-access-management/identity-access-management.module";
import {TokenInterceptorService} from "./guard/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchPackagesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    RouterOutlet,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    TourPackagesModule,
    IdentityAccessManagementModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
