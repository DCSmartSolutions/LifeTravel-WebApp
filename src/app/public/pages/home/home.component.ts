import {Component, OnInit} from '@angular/core';
import {TourPackageService} from "../../../tour-experience/services/tour-package.service";
import {MatDialog} from "@angular/material/dialog";
import {
  FilterPackagesModal
} from "../../../tour-experience/components/filter-packages-modal/filter-packages-modal.component";
import {UserService} from "../../../identity-access-management/services/user.service";
import {USER_ROLE} from "../../../identity-access-management/enums/role";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tourPackages: any[] = [];
  filter: any
  isAgency: boolean = false;

  constructor(private searchService: TourPackageService,
              private userService: UserService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.searchService.getAllPackages().subscribe(packages => {
      this.tourPackages = packages;
    });
    const userId = this.userService.getUserIdFromCookies();
    this.userService.getUserById(userId).subscribe(user => {
        this.isAgency = user.role === USER_ROLE.AGENCY;
        if (this.isAgency) {
          this.router.navigate(['peru/tour-packages/my-packages']);
        }
      }
    );
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
}
