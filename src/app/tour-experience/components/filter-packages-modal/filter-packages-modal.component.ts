import {Component, OnInit} from '@angular/core';
import {max, min} from "rxjs";
import {Activity} from "../../models/activity.model";
import {TourPackageService} from "../../services/tour-package.service";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-filter-packages-modal',
  templateUrl: './filter-packages-modal.component.html',
  styleUrls: ['./filter-packages-modal.component.scss']
})
export class FilterPackagesModal implements OnInit {


  minValue: number = 180;
  maxValue: number = 400;
  priceRange: number = 130;

  protected readonly min = min;
  protected readonly max = max;
  maxN: number = 500;
  minN: number = 50;
  languages: any[] = [
    {name: 'English', checked: false},
    {name: 'Spanish', checked: false},
    {name: 'French', checked: false},
  ];
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit() {
    this.activityService.getActivities().subscribe(activities => {
        this.activities = activities;
      }, error => {
        console.log(error);
      }
    )
  }

  clear() {
    this.languages.forEach(language => {
      language.checked = false;
    })
    this.minValue = this.minN;
    this.maxValue = this.maxN;
    this.activities.forEach(activity => {
      activity.selected = false;
    })
  }
}
