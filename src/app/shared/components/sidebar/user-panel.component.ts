import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel">
      <img class="matero-user-panel-avatar" src="https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name">{{ user.name }}</h4>
      <h5 class="matero-user-panel-email">{{ user.email }}</h5>
      <div class="matero-user-panel-icons">
        <button
          mat-icon-button
          routerLink="/profile/overview"
          matTooltip="{{ 'profile' }}"
        >
          <mat-icon class="icon-18">account_circle</mat-icon>
        </button>
        <button
          mat-icon-button
          routerLink="/profile/settings"
          matTooltip="{{ 'edit_profile' }}"
        >
          <mat-icon class="icon-18">edit</mat-icon>
        </button>
        <button mat-icon-button (click)="logout()" matTooltip="{{ 'logout' }}">
          <mat-icon class="icon-18">exit_to_app</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent implements OnInit {
  user!: User;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user().subscribe((user: any) => (
      this.user = user

    ));
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }
}
