import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaceSearchModalComponent } from '../../../tour-experience/components/place-search-modal/place-search-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @HostBinding('class') class = 'matero-header';
  @Input() isAgency: boolean = false;
  @Input() showToggle = true;
  @Input() showBranding = true;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
  showSearchInput: boolean = true;

  constructor(public dialog: MatDialog) {}

  showSearchDialog() {
    this.showSearchInput = false;
    const dialogRef = this.dialog.open(PlaceSearchModalComponent, {
      width: '600px',
      position: {
        top: '60px',
      },
      panelClass: 'search-places-dialog',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.showSearchInput = true;
    });
  }
}
