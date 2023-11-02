import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MENU_ITEMS, MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  // Note: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menu$ = MENU_ITEMS;

  buildRoute = this.menu.buildRoute;

  constructor(private menu: MenuService) {
    console.log(this.menu$)
  }
}
