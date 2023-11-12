import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.scss']
})
export class ListPackagesComponent implements OnInit {
  @Input() className: string = "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 p-4";
  @Input() isAgency: boolean = false;
  packages: any[] = [];
  @Input() filteredPackages: any = null;
  constructor(private http: HttpClient,
              private router: Router) {

  }

  ngOnInit() {
  }

  editTourPackage(tourPackage: any) {
    this.router.navigate(['peru/tour-packages/detail',tourPackage.id]);
  }

  goToDetail(tourPackage: any) {
    this.router.navigate(['peru/tour-packages/detail-info',tourPackage.id]);
  }
}
