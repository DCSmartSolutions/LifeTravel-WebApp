import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
      <img src="./assets/images/life-travel.png" class="brand-logo align-middle mt-5" alt="logo"  href="/" />
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
