import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { User } from '../interfaces/user';
import { FirebaseAuthCustomService } from '../../iam/services/firebase-auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  template: `
    <!--    <button class="r-full" mat-button [matMenuTriggerFor]="menu">-->
    <!--      <mat-icon>search</mat-icon>-->
    <!--    </button>-->
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon class="text-white">account_circle</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <!--      <button routerLink="/profile/overview" mat-menu-item>-->
      <!--        <mat-icon>account_circle</mat-icon>-->
      <!--        <span>{{ 'profile'  }}</span>-->
      <!--      </button>-->
      <!--      <button routerLink="/profile/settings" mat-menu-item>-->
      <!--        <mat-icon>edit</mat-icon>-->
      <!--        <span>{{ 'edit_profile' }}</span>-->
      <!--      </button>-->
      <!--      <button mat-menu-item (click)="restore()">-->
      <!--        <mat-icon>restore</mat-icon>-->
      <!--        <span>{{ 'restore_defaults' }}</span>-->
      <!--      </button>-->
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'logout' }}</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .avatar {
        width: 24px;
        height: 24px;
      }

      .r-full {
        border-radius: 50%;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  user!: User;
  private dialog: MatDialogRef<SpinnerComponent> | undefined;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private settings: SettingsService,
    private matDialog: MatDialog,
    private cookieService: CookieService,
    private fireAuthCustomService: FirebaseAuthCustomService,
  ) {}

  ngOnInit(): void {}

  showSpinnerDialog() {
    this.dialog = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true,
    });
  }

  hideSpinnerDialog() {
    this.dialog?.close();
  }

  logout() {
    this.showSpinnerDialog();
    this.fireAuthCustomService.logout().then((r) =>
      setTimeout(() => {
        this.router.navigate(['/authentication']);
        this.hideSpinnerDialog();
      }, 3000),
    );
  }

  restore() {
    this.settings.reset();
    window.location.reload();
  }
}
