import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MENU_ITEMS, MenuService} from "../../services/menu.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../identity-access-management/services/user.service";
import {USER_ROLE} from "../../../identity-access-management/enums/role";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  // Note: Ripple effect make page flashing on mobile
  @Input() ripple = false;
  role: USER_ROLE | null = null;
  menu$ = MENU_ITEMS;

  buildRoute = this.menu.buildRoute;
  userId: string = '';

  constructor(private menu: MenuService,private route: ActivatedRoute,private userService: UserService) {
    const userId = this.userService.getUserIdFromCookies();
    //console.log(this.menu$)
    this.userService.getUserById(userId).subscribe(user => {
        this.role = user.role;
      }
    );
  }
}
