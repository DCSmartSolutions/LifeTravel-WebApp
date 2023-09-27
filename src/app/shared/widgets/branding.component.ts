import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
      <a class="navbar-brand" href="/">
          <img src="./assets/images/life-travel.png" class="brand-logo align-middle mt-5" alt="logo"/>
      </a>
  `,
  styles: [
    `
      .brand-logo {
        height: 26px;
      }
    `,
  ],
})
export class BrandingComponent {}
