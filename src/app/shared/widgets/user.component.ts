import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {SettingsService} from "../services/settings.service";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-user',
  template: `
<!--    <button class="r-full" mat-button [matMenuTriggerFor]="menu">-->
<!--      <mat-icon>search</mat-icon>-->
<!--    </button>-->
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>account_circle</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'profile'  }}</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>edit</mat-icon>
        <span>{{ 'edit_profile' }}</span>
      </button>
      <button mat-menu-item (click)="restore()">
        <mat-icon>restore</mat-icon>
        <span>{{ 'restore_defaults' }}</span>
      </button>
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

  constructor(
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.auth
      .user()
      .pipe(
        tap(user => (this.user = user)),
        debounceTime(10)
      )
      .subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  restore() {
    this.settings.reset();
    window.location.reload();
  }
}
