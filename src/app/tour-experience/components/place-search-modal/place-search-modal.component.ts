import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-search-modal',
  templateUrl: './place-search-modal.component.html',
  styleUrls: ['./place-search-modal.component.scss'],
})
export class PlaceSearchModalComponent {
  constructor(private router: Router) {}
  goToSearchTourPackages(number: number) {
    this.router.navigate([`peru/tour-packages/${number}`]);
  }
}
