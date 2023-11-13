import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../identity-access-management/models/user.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../identity-access-management/services/user.service";
import {Router} from "@angular/router";
import {TourPackage} from "../../models/tour-package.model";

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss']
})
export class PackageCardComponent implements OnInit {
  @Input() tourPackage: any = new TourPackage();
  @Input() isAgency: boolean = false;
  agencyName: string = '';
  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) {
  }
  ngOnInit() {
    this.getAgencyName(this.tourPackage.agencyId);
  }

  editTourPackage(tourPackage: any) {
    this.router.navigate(['peru/tour-packages/detail', tourPackage.id]);
  }

  goToDetail(tourPackage: any) {
    this.router.navigate(['peru/tour-packages/detail-info', tourPackage.id]);
  }

  getAgencyName(agencyId: string) {
    this.userService.getUserById(agencyId).subscribe((user: User) => {
        this.agencyName =  user.name;
      }
    );
  }
}
