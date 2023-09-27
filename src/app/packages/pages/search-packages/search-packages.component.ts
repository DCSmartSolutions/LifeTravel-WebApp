import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-packages',
  templateUrl: './search-packages.component.html',
  styleUrls: ['./search-packages.component.scss']
})
export class SearchPackagesComponent implements OnInit {
  filteredPackages: any[] = [];
  region: any;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
        const regionId = params['regionId'];
        console.log("regionId", regionId)
        this.filteredPackages = this.searchService.getPackagesByRegionId(regionId);
        this.region = this.searchService.getRegionById(regionId);
      }
    );
  }
}
