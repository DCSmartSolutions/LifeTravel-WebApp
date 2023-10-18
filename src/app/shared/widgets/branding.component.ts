import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
      <a class="navbar-brand" href="/">
          <img src="./assets/images/life-travel.png" class="brand-logo align-middle" alt="logo"/>
      </a>
  `,
  styles: [
    `
      .brand-logo {
        height: 30px;
        margin-top: -15px;
      }
    `,
  ],
})
export class BrandingComponent {}
