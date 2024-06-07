import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AdminLayoutComponent } from './pages/layout/admin-layout.component';
import { NgProgressComponent } from 'ngx-progressbar';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavAccordionToggleDirective } from './components/sidemenu/nav-accordion-toggle.directive';
import { NavAccordionDirective } from './components/sidemenu/nav-accordion.directive';
import { NavAccordionItemDirective } from './components/sidemenu/nav-accordion-item.directive';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrandingComponent } from './widgets/branding.component';
import { UserComponent } from './widgets/user.component';
import { MatListModule } from '@angular/material/list';
import { NgxPermissionsRestrictStubDirective } from 'ngx-permissions';
import { MatInputModule } from '@angular/material/input';
import { SharedRoutingModule } from './shared-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { MatSelectModule } from '@angular/material/select';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { ConfirmationMessageComponent } from './components/confirmation-message/confirmation-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    SpinnerComponent,
    TimePickerComponent,
    AlertMessageComponent,
    ConfirmationMessageComponent,
  ],
  exports: [AdminLayoutComponent, SpinnerComponent, TimePickerComponent],
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
    SharedRoutingModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgProgressComponent,
    MatListModule,
    NgxPermissionsRestrictStubDirective,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedLayoutModule {}
