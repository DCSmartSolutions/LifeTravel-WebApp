import { Component } from '@angular/core';
import {max, min} from "rxjs";

@Component({
  selector: 'app-filter-packages-modal',
  templateUrl: './filter-packages-modal.component.html',
  styleUrls: ['./filter-packages-modal.component.scss']
})
export class FilterPackagesModal {
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
  clear(){
    this.languages.forEach(language => {
      language.checked = false;
    })
    this.minValue = this.minN;
    this.maxValue = this.maxN;
  }
}
