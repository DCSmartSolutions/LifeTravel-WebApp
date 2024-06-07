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
import { OpenAIService } from '../../services/openai.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PinkToast } from '../../widgets/customToast.component';

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
  searchText: string = '';
  respuestaDelEndpoint: string = '';

  constructor(
    public dialog: MatDialog,
    private openAIService: OpenAIService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

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
  submitSearchOpenAI() {
    this.openAIService.getChatResponse(this.searchText).subscribe(
      (data) => {
        this.toastr.show(data, 'Ai Bot 🤖', { toastComponent: PinkToast });
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        this.router.navigate([`peru/tour-packages/${randomNumber}`]);
      },
      (error) => {
        console.error('Error al obtener respuesta del endpoint:', error);
      },
    );
  }

  goToDashboard() {
    this.router.navigate(['peru/dashboard']);
  }

}
