import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { USER_ROLE } from '../../iam/enums/role';

export interface MenuTag {
  color: string;
  value: string;
}

export interface MenuPermissions {
  only?: string | string[];
  except?: string | string[];
}

export interface MenuChildrenItem {
  route: string;
  name: string;
  role: USER_ROLE;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: MenuChildrenItem[];
  permissions?: MenuPermissions;
}
export const MENU_ITEMS: Menu[] = [
  {
    route: 'peru/tour-packages',
    name: 'Tour Experience',
    type: 'sub',
    icon: 'route',
    role: USER_ROLE.AGENCY,
    children: [
      {
        route: 'my-packages',
        name: 'My Packages',
        role: USER_ROLE.AGENCY,
        type: 'link',
      },
      {
        route: 'add-tour-package',
        name: 'Add Package',
        role: USER_ROLE.AGENCY,
        type: 'link',
      },
    ],
  },
  {
    route: 'peru/transportation',
    name: 'Transportation',
    type: 'sub',
    icon: 'directions_bus',
    role: USER_ROLE.AGENCY,
    children: [
      {
        route: 'my-vehicles',
        name: 'My Vehicles',
        role: USER_ROLE.AGENCY,
        type: 'link',
      },
    ],
  },
  // {
  //   "route": "peru/my-subscription",
  //   "name": "My Subscription",
  //   "type": "link",
  //   "icon": "payment",
  //   "role": USER_ROLE.AGENCY
  // },
  {
    route: 'peru/',
    name: 'Search Packages',
    type: 'link',
    icon: 'search',
    role: USER_ROLE.TOURIST,
  },
  // {
  //   "route": "peru/my-bookings",
  //   "name": "My Bookings",
  //   'type': 'link',
  //   "icon": "local_library",
  //   "role": USER_ROLE.TOURIST
  // },
  // {
  //   "route": "peru/my-reviews",
  //   "name": "My Reviews",
  //   'type': 'link',
  //   "icon": "rate_review",
  //   "role": USER_ROLE.TOURIST
  // }
];

export interface Menu {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  role: USER_ROLE;
  label?: MenuTag;
  badge?: MenuTag;
  children?: MenuChildrenItem[];
  permissions?: MenuPermissions;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  getAll(): Observable<Menu[]> {
    return this.menu$.asObservable();
  }

  change(): Observable<Menu[]> {
    return this.menu$.pipe(share());
  }

  set(menu: Menu[]): Observable<Menu[]> {
    this.menu$.next(menu);
    return this.menu$.asObservable();
  }

  add(menu: Menu) {
    const tmpMenu = this.menu$.value;
    tmpMenu.push(menu);
    this.menu$.next(tmpMenu);
  }

  reset() {
    this.menu$.next([]);
  }

  buildRoute(routeArr: string[]): string {
    let route = '';
    routeArr.forEach((item) => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }

  getItemName(routeArr: string[]): string {
    return this.getLevel(routeArr)[routeArr.length - 1];
  }

  private isLeafItem(item: MenuChildrenItem): boolean {
    const cond0 = item.route === undefined;
    const cond1 = item.children === undefined;
    const cond2 = !cond1 && item.children?.length === 0;
    return cond0 || cond1 || cond2;
  }

  private deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  private isJsonObjEqual(obj0: any, obj1: any): boolean {
    return JSON.stringify(obj0) === JSON.stringify(obj1);
  }

  private isRouteEqual(
    routeArr: Array<string>,
    realRouteArr: Array<string>,
  ): boolean {
    realRouteArr = this.deepClone(realRouteArr);
    realRouteArr = realRouteArr.filter((r) => r !== '');
    return this.isJsonObjEqual(routeArr, realRouteArr);
  }

  getLevel(routeArr: string[]): string[] {
    let tmpArr: any[] = [];
    this.menu$.value.forEach((item) => {
      // Breadth-first traverse
      let unhandledLayer = [{ item, parentNamePathList: [], realRouteArr: [] }];
      while (unhandledLayer.length > 0) {
        let nextUnhandledLayer: any[] = [];
        for (const ele of unhandledLayer) {
          const eachItem = ele.item;
          const currentNamePathList = this.deepClone(
            ele.parentNamePathList,
          ).concat(eachItem.name);
          const currentRealRouteArr = this.deepClone(ele.realRouteArr).concat(
            eachItem.route,
          );
          if (this.isRouteEqual(routeArr, currentRealRouteArr)) {
            tmpArr = currentNamePathList;
            break;
          }
          if (!this.isLeafItem(eachItem)) {
            const wrappedChildren = eachItem.children?.map((child) => ({
              item: child,
              parentNamePathList: currentNamePathList,
              realRouteArr: currentRealRouteArr,
            }));
            nextUnhandledLayer = nextUnhandledLayer.concat(wrappedChildren);
          }
        }
        unhandledLayer = nextUnhandledLayer;
      }
    });
    return tmpArr;
  }

  addNamespace(menu: Menu[] | MenuChildrenItem[], namespace: string) {
    menu.forEach((menuItem) => {
      menuItem.name = `${namespace}.${menuItem.name}`;
      if (menuItem.children && menuItem.children.length > 0) {
        this.addNamespace(menuItem.children, menuItem.name);
      }
    });
  }
}
