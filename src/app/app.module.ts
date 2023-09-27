import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {PublicLayoutModule} from "./public/public-layout.module";
import {AppRoutingModule} from "./app-routing.module";
import {ListPackagesComponent} from './packages/components/list-packages/list-packages.component';
import {SearchPackagesComponent} from './packages/pages/search-packages/search-packages.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgxPermissionsModule} from "ngx-permissions";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './shared/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPackagesComponent,
    SearchPackagesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PublicLayoutModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
