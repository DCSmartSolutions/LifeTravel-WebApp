import {Component, Input} from '@angular/core';
import {TourPackage} from "../../models/tour-package.model";

@Component({
  selector: 'app-package-grid',
  templateUrl: './package-grid.component.html',
  styleUrls: ['./package-grid.component.scss']
})
export class PackageGridComponent {
  @Input() className: string = "col-12 col-sm-12 col-md-6 col-lg-4 p-4";
  @Input() isAgency: boolean = false;
  packages: any[] = [];
  @Input() filteredPackages: TourPackage[] = [];

}
