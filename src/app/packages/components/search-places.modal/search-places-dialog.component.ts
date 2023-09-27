import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-search-places.modal',
  templateUrl: './search-places-dialog.component.html',
  styleUrls: ['./search-places-dialog.component.scss']
})
export class SearchPlacesDialog {
  constructor(private router: Router, private route: ActivatedRoute, public dialogRef: MatDialogRef<SearchPlacesDialog>) {
  }


  goToSeachTourPackages(number: number) {
    this.router.navigate([`peru/tour-packages/${number}`]);
    this.dialogRef.close();
  }
}
