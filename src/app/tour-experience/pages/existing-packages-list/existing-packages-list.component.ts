import {Component, OnInit} from '@angular/core';
import {TourPackageService} from "../../services/tour-package.service";
import {MatDialog} from "@angular/material/dialog";
import {SettingsService} from "../../../shared/services/settings.service";
import {Router} from "@angular/router";
import {TourPackage} from "../../models/tour-package.model";

@Component({
  selector: 'app-existing-packages-list',
  templateUrl: './existing-packages-list.component.html',
  styleUrls: ['./existing-packages-list.component.scss']
})
export class ExistingPackagesListComponent implements OnInit {
  tourPackages: TourPackage[] = [];
  showVisiblePackage: boolean = true;
  showHiddenPackage: boolean = true;

  constructor(private searchService: TourPackageService,
              private settingsService: SettingsService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.searchService.getAllPackagesByAgency().subscribe(packages => {
      this.tourPackages = packages;
    });
    this.settingsService.setDefaultLayout();
  }

  addTourPackage() {
    this.router.navigate(['peru/tour-packages/add-tour-package']);
  }

  getVisiblePackage() {
    if (this.showVisiblePackage) {
      this.searchService.getAllVisiblePackagesByAgency().subscribe(packages => {
          if (this.showHiddenPackage) {
            this.tourPackages.push(...packages);
          } else {
            this.tourPackages = packages;
          }
        }
      );
    } else if (this.showHiddenPackage) {
      this.getHiddenPackage();
    } else {
      this.tourPackages = [];
    }
  }

  getHiddenPackage() {
    if (this.showHiddenPackage) {
      this.searchService.getAllHiddenPackagesByAgency().subscribe(packages => {
          if (this.showVisiblePackage) {
            this.tourPackages.push(...packages);
          } else {
            this.tourPackages = packages;
          }
        }
      );
    } else if (this.showVisiblePackage) {
      this.getVisiblePackage()
    } else {
      this.tourPackages = [];
    }

  }
}
