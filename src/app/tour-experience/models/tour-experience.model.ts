import {Schedule} from "./time-picker.model";
import {TourPackage} from "./tour-package.model";

export class TourExperience {
  id: number = 0;
  tourPackageId: number = 0;
  tourPackage: TourPackage = new TourPackage();
  schedule: Schedule[] = [];
}
