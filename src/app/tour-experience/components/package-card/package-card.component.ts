import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../iam/models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../iam/services/user.service';
import { Router } from '@angular/router';
import { TourPackage } from '../../models/tour-package.model';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'],
})
export class PackageCardComponent implements OnInit {
  // Input properties for receiving data from parent components
  @Input() tourPackage: TourPackage = new TourPackage();
  @Input() isAgency: boolean = false;
  // Variable to store agency name
  agencyName: string = '';

  // Constructor to inject required services
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
  ) {}

  // Lifecycle hook - ngOnInit is called after the component is initialized
  ngOnInit() {
    // If the component is not representing an agency, fetch and display agency name
    if (!this.isAgency) this.getAgencyName(this.tourPackage.agencyId);
  }

  // Method to navigate to the edit page for a tour package
  editTourPackage(tourPackage: any) {
    this.router.navigate(['peru/tour-packages/detail', tourPackage.id]);
  }

  // Method to navigate to the detailed information page for a tour package
  goToDetail(tourPackage: any) {
    this.router.navigate(['peru/tour-packages/detail-info', tourPackage.id]);
  }

  // Method to fetch and set the agency name based on the agencyId
  getAgencyName(agencyId: string) {
    this.userService.getUserById(agencyId).subscribe((user: User) => {
      // Set the agencyName property with the fetched user's name
      this.agencyName = user.name;
    });
  }
}
