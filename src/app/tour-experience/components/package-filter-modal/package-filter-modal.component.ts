import {Component, OnInit} from '@angular/core';
import {max, min} from "rxjs";
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-package-filter-modal',
  templateUrl: './package-filter-modal.component.html',
  styleUrls: ['./package-filter-modal.component.scss']
})
export class PackageFilterModal implements OnInit {


  minValue: number = 180;
  maxValue: number = 400;
  priceRange: number = 130;

  protected readonly min = min;
  protected readonly max = max;
  maxN: number = 500;
  minN: number = 50;
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit() {
    this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
    });
  }

  clear() {
    this.minValue = this.minN;
    this.maxValue = this.maxN;
    this.activities.forEach(activity => {
      activity.selected = false;
    })
  }
}
