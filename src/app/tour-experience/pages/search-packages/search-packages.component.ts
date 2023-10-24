import { Component, OnInit } from '@angular/core';
import { TourPackageService } from "../../services/tour-package.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search-packages',
  templateUrl: './search-packages.component.html',
  styleUrls: ['./search-packages.component.scss']
})
export class SearchPackagesComponent implements OnInit {
  filteredPackages: any[] = [];
  region: any;
  constructor(private searchService: TourPackageService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
        const regionId = params['regionId'];
        console.log("regionId", regionId)
        this.searchService.getRegionById(regionId).subscribe(region => {
          this.region = region;
          console.log("region", region);
        });
        this.searchService.getPackagesByRegionId(regionId).subscribe(packages => {
          this.filteredPackages = packages;
          console.log("packages", packages);
        });
      }
    );
  }
}
