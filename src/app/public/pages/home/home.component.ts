import {Component, OnInit} from '@angular/core';
import {TourPackageService} from "../../../packages/services/tour-package.service";
import {MatDialog} from "@angular/material/dialog";
import {
  FilterPackagesModal
} from "../../../packages/components/filter-packages-modal/filter-packages-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tourPackages: any[] = [];
  filter:any
  constructor(private searchService: TourPackageService,
              public dialog: MatDialog) {
  }
  ngOnInit() {
    this.searchService.getAllPackages().subscribe(packages => {
      this.tourPackages = packages;
      console.log("packages", packages);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FilterPackagesModal, {
      maxWidth: '80vw',
      minWidth: '50vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.filter = result;
    });
  }
}
