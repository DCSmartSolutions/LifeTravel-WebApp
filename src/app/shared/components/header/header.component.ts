import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import screenfull from 'screenfull';
import {MatDialog} from "@angular/material/dialog";
import {
  SearchPlacesModalComponent
} from "../../../packages/components/search-places.modal/search-places.modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @HostBinding('class') class = 'matero-header';

  @Input() showToggle = true;
  @Input() showBranding = true;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {

  }
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  showSearchDialog() {
    this.dialog.open(SearchPlacesModalComponent, {
      width: '600px',
      position: {
        top: '60px'
      },
      autoFocus: false,
    });
  }
}
