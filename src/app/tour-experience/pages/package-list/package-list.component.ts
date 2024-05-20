import { Component, OnInit } from '@angular/core';
import { TourPackageService } from '../../services/tour-package.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../../shared/services/settings.service';
import { Router } from '@angular/router';
import { TourPackage } from '../../models/tour-package.model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  tourPackages: TourPackage[] = [];
  showVisiblePackage: boolean = true;
  showHiddenPackage: boolean = true;
  departments: any[] = [];
  private dialogRef: MatDialogRef<SpinnerComponent> | undefined;
  constructor(
    private searchService: TourPackageService,
    private settingsService: SettingsService,
    private router: Router,
    private matDialog: MatDialog,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.showSpinnerDialog();
    this.searchService.getAllPackagesByAgency().subscribe((packages) => {
      this.tourPackages = packages;
      this.hideSpinnerDialog();
    });
    this.settingsService.setDefaultLayout();
  }

  addTourPackage() {
    this.router.navigate(['peru/tour-packages/add-tour-package']);
  }

  getVisiblePackage() {
    if (this.showVisiblePackage) {
      this.searchService
        .getAllVisiblePackagesByAgency()
        .subscribe((packages) => {
          if (this.showHiddenPackage) {
            this.tourPackages.push(...packages);
          } else {
            this.tourPackages = packages;
          }
        });
    } else if (this.showHiddenPackage) {
      this.getHiddenPackage();
    } else {
      this.tourPackages = [];
    }
  }

  getHiddenPackage() {
    if (this.showHiddenPackage) {
      this.searchService
        .getAllHiddenPackagesByAgency()
        .subscribe((packages) => {
          if (this.showVisiblePackage) {
            this.tourPackages.push(...packages);
          } else {
            this.tourPackages = packages;
          }
        });
    } else if (this.showVisiblePackage) {
      this.getVisiblePackage();
    } else {
      this.tourPackages = [];
    }
  }
  showSpinnerDialog() {
    this.dialogRef = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true,
    });
  }

  hideSpinnerDialog() {
    this.dialogRef?.close();
  }
}
