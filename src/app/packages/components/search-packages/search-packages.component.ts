import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-search-packages',
  templateUrl: './search-packages.component.html',
  styleUrls: ['./search-packages.component.css']
})
export class SearchPackagesComponent {
  filteredPackages: any[] = [];
  region: any;
  regions: any[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.filteredPackages = this.searchService.getPackagesByRegionId(2);
    this.region = this.searchService.getRegionById(2);
    this.regions = this.searchService.getRegions();
  }
}
