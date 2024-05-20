import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SettingsService } from '../../services/settings.service';
import { AppSettings } from '../../interfaces/settings';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../iam/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { USER_ROLE } from '../../../iam/enums/role';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY =
  'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnDestroy, OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;
  private dialog: MatDialogRef<SpinnerComponent> | undefined;
  options = this.settings.options;
  isAgency: boolean = false;

  get themeColor() {
    return this.settings.themeColor;
  }

  get isOver(): boolean {
    return this.isMobileScreen;
  }
  showSpinnerDialog() {
    this.dialog = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true,
    });
  }

  hideSpinnerDialog() {
    this.dialog?.close();
  }
  private isMobileScreen = false;

  @HostBinding('class.matero-content-width-fix') get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  private isContentWidthFixed = true;

  @HostBinding('class.matero-sidenav-collapsed-fix') get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === 'top' ||
        (this.options.sidenavOpened && this.isOver))
    );
  }

  private isCollapsedWidthFixed = false;

  private layoutChangesSubscription = Subscription.EMPTY;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private settings: SettingsService,
    private matDialog: MatDialog,
    private userService: UserService,
    private cookieService: CookieService,
  ) {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        if (this.isOver) {
          this.sidenav.close();
        }
        this.content.scrollTo({ top: 0 });
      });
    this.options.headerPos = 'above';
    this.options.theme = 'dark';
    this.options.navPos = 'side';
    this.options.sidenavOpened = false;
    this.options.sidenavCollapsed = false;
    this.options.showHeader = true;
    this.settings.setOptions(this.options);
    this.updateOptions(this.options);
    const uid = this.cookieService.get('JUID');
    this.userService.getUserById(uid).subscribe((user: any) => {
      //console.log(user)
      this.isAgency = user.role === USER_ROLE.AGENCY;
    });
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  // TODO: Trigger when transition end
  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  updateOptions(options: AppSettings) {
    this.options = options;
    this.settings.setOptions(options);
    this.settings.setDirection();
    this.settings.setTheme();
  }
}
