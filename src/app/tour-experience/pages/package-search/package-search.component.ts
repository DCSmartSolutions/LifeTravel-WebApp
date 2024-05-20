import { Component, OnInit } from '@angular/core';
import { TourPackageService } from '../../services/tour-package.service';
import { ActivatedRoute } from '@angular/router';
import { Region } from '../../models/region.model';

@Component({
  selector: 'app-package-search',
  templateUrl: './package-search.component.html',
  styleUrls: ['./package-search.component.scss'],
})
export class PackageSearchComponent implements OnInit {
  filteredPackages: any[] = [];
  region: Region = new Region();
  constructor(
    private searchService: TourPackageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const regionId = params['regionId'];
      this.searchService.getRegionById(regionId).subscribe((region) => {
        this.region = region;
      });
      this.searchService
        .getPackagesByRegionId(regionId)
        .subscribe((packages) => {
          this.filteredPackages = packages;
        });
    });
  }
}
