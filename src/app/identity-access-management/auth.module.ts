import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {NgxPermissionsRestrictStubDirective} from "ngx-permissions";
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from "./pages/login/login.component";
import {LoginCardComponent} from "./components/login-card/login-card.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent,
    LoginCardComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,

    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatListModule,
    NgxPermissionsRestrictStubDirective,
    MatInputModule,
    ReactiveFormsModule,

  ]
})
export class SharedModule { }
