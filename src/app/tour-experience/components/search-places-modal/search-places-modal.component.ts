import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-places-modal',
  templateUrl: './search-places-modal.component.html',
  styleUrls: ['./search-places-modal.component.scss']
})
export class SearchPlacesModalComponent {
  constructor(private router: Router) {
  }
  goToSearchTourPackages(number: number) {
    this.router.navigate([`peru/tour-packages/${number}`]);
  }
}
