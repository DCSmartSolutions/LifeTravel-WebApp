import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../../packages/services/search.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tourPackages: any[] = [];
  constructor(private searchService: SearchService) {
  }
  ngOnInit() {
    this.searchService.getAllPackages().subscribe(packages => {
      this.tourPackages = packages;
      console.log("packages", packages);
    });
  }
}
