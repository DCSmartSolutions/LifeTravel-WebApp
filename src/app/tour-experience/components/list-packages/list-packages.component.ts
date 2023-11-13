import {Component, Input} from '@angular/core';
import {TourPackage} from "../../models/tour-package.model";

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.scss']
})
export class ListPackagesComponent {
  @Input() className: string = "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 p-4";
  @Input() isAgency: boolean = false;
  packages: any[] = [];
  @Input() filteredPackages: TourPackage[] = [];

}
