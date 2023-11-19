import {Component, OnInit} from '@angular/core';
import {TourPackageService} from "../../../tour-experience/services/tour-package.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  FilterPackagesModal
} from "../../../tour-experience/components/filter-packages-modal/filter-packages-modal.component";
import {UserService} from "../../../identity-access-management/services/user.service";
import {USER_ROLE} from "../../../identity-access-management/enums/role";
import {Router} from "@angular/router";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tourPackages: any[] = [];
  filter: any
  isAgency: boolean = false;
  private dialogRef: MatDialogRef<SpinnerComponent> | undefined;
  constructor(private searchService: TourPackageService,
              private userService: UserService,
              private router: Router,
              private matDialog: MatDialog,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    const userId = this.userService.getUserIdFromCookies();
    this.userService.getUserById(userId).subscribe(user => {
        this.isAgency = user.role === USER_ROLE.AGENCY;
        if (this.isAgency) {
          this.router.navigate(['peru/tour-packages/my-packages']);
        }
      }
    );
    this.showSpinnerDialog();
    this.searchService.getAllPackages().subscribe(packages => {
      this.tourPackages = packages;
      this.hideSpinnerDialog();
    });


  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FilterPackagesModal, {
      maxWidth: '80vw',
      minWidth: '50vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filter = result;
    });
  }
  showSpinnerDialog() {
    this.dialogRef = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true
    });
  }

  hideSpinnerDialog() {
    this.dialogRef?.close();
  }
}
