import {Component, OnDestroy, OnInit} from '@angular/core';
import {TourPackageService} from "../../services/tour-package.service";
import {MatDialog} from "@angular/material/dialog";
import {SettingsService} from "../../../shared/services/settings.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-existing-tour-packages-list',
  templateUrl: './existing-tour-packages-list.component.html',
  styleUrls: ['./existing-tour-packages-list.component.scss']
})
export class ExistingTourPackagesListComponent implements OnInit{
  tourPackages: any[] = [];
  constructor(private searchService: TourPackageService,
              private settingsService: SettingsService,
              private router: Router,
              public dialog: MatDialog) {
  }
  ngOnInit() {
    this.searchService.getAllPackages().subscribe(packages => {
      this.tourPackages = packages;
      console.log("packages", packages);
    });
    //this.settingsService.setAgencyLayout();
  }

}
