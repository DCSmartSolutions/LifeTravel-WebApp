import { Component, Inject, Input, OnInit } from '@angular/core';
import { max, min } from 'rxjs';
import { Activity } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-package-filter-modal',
  templateUrl: './package-filter-modal.component.html',
  styleUrls: ['./package-filter-modal.component.scss'],
})
export class PackageFilterModal implements OnInit {
  minValue: number = 180;
  maxValue: number = 400;
  priceRange: number = 130;

  protected readonly min = min;
  protected readonly max = max;
  maxN: number = 500;
  minN: number = 0;
  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.minValue = data.minValue;
    this.maxValue = data.maxValue;
    this.maxN = data.maxValue;
  }

  ngOnInit() {
    this.activityService.getActivities().subscribe((activities) => {
      activities.forEach((activity) => {
        activity.selected = true;
      });
      this.activities = activities;
    });
  }

  clear() {
    this.minValue = this.minN;
    this.maxValue = this.maxN;
    this.activities.forEach((activity) => {
      activity.selected = false;
    });
  }
  get selectedActivities() {
    return this.activities.filter((activity) => activity.selected);
  }
  get invalidRange() {
    return (
      this.minValue > this.maxValue ||
      this.minValue < this.minN ||
      this.maxValue > this.maxN ||
      this.maxValue < this.minN
    );
  }
}
