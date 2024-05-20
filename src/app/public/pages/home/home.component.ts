import { Component, OnInit } from '@angular/core';
import { TourPackageService } from '../../../tour-experience/services/tour-package.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PackageFilterModal } from '../../../tour-experience/components/package-filter-modal/package-filter-modal.component';
import { UserService } from '../../../iam/services/user.service';
import { USER_ROLE } from '../../../iam/enums/role';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tourPackages: any[] = [];
  tourPackagesFiltered: any[] = [];
  filter: any;
  isAgency: boolean = false;
  hasBeenFiltered: boolean = false;
  private dialogRef: MatDialogRef<SpinnerComponent> | undefined;

  constructor(
    private searchService: TourPackageService,
    private userService: UserService,
    private router: Router,
    private matDialog: MatDialog,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    const userId = this.userService.getUserIdFromCookies();
    this.userService.getUserById(userId).subscribe((user) => {
      this.isAgency = user.role === USER_ROLE.AGENCY;
      if (this.isAgency) {
        this.router.navigate(['peru/tour-packages/my-packages']);
      }
    });
    this.showSpinnerDialog();
    this.searchService.getAllPackages().subscribe((packages) => {
      this.tourPackages = packages;
      this.tourPackagesFiltered = packages;
      this.hideSpinnerDialog();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PackageFilterModal, {
      maxWidth: '80vw',
      minWidth: '50vw',
      maxHeight: '90vh',
      data: {
        minValue: this.tourPackages.reduce(
          (min: any, p: any) => (p.price < min ? p.price : min),
          this.tourPackages[0].price,
        ),
        maxValue: this.tourPackages.reduce(
          (max: any, p: any) => (p.price > max ? p.price : max),
          this.tourPackages[0].price,
        ),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.filterPackages(result);
      this.hasBeenFiltered = true;
    });
  }

  filterPackages(filter: any) {
    this.tourPackagesFiltered = this.tourPackages.filter((p: any) => {
      return (
        (p.price >= filter.minValue && p.price <= filter.maxValue) ||
        filter.activities.includes(p.activity)
      );
    });
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

  clearFilters() {
    this.tourPackagesFiltered = this.tourPackages;
    this.hasBeenFiltered = false;
  }
}
