import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {AdminLayoutComponent} from "./pages/admin-layout/admin-layout.component";
import {NgProgressComponent} from "ngx-progressbar";
import {HeaderComponent} from "./components/header/header.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NavAccordionToggleDirective} from "./components/sidemenu/nav-accordion-toggle.directive";
import {NavAccordionDirective} from "./components/sidemenu/nav-accordion.directive";
import {NavAccordionItemDirective} from "./components/sidemenu/nav-accordion-item.directive";
import {SidemenuComponent} from "./components/sidemenu/sidemenu.component";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BrandingComponent} from "./widgets/branding.component";
import {UserComponent} from "./widgets/user.component";
import {MatListModule} from "@angular/material/list";
import {NgxPermissionsRestrictStubDirective} from "ngx-permissions";
import {MatInputModule} from "@angular/material/input";
import {PublicLayoutRoutingModule} from "./public-layout-routing.module";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    NavAccordionToggleDirective,
    NavAccordionDirective,
    NavAccordionItemDirective,
    SidemenuComponent,
    BrandingComponent,
    UserComponent,
  ],
  exports: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    PublicLayoutRoutingModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgProgressComponent,
    MatListModule,
    NgxPermissionsRestrictStubDirective,
    MatInputModule,

  ]
})
export class PublicLayoutModule { }
