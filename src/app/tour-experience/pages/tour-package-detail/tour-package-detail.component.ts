import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TourPackage} from "../../models/tour-package.model";
import {TourPackageService} from "../../services/tour-package.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AzureBlobStorageService} from "../../services/azure-blob-storage.service";

@Component({
  selector: 'app-tour-package-detail',
  templateUrl: './tour-package-detail.component.html',
  styleUrls: ['./tour-package-detail.component.scss']
})
export class TourPackageDetailComponent implements OnInit {
  title: string = "Add New Tour Package";
  tourPackage: TourPackage = new TourPackage();
  tourForm: FormGroup = new FormGroup({});
  activities: any[] = [
    {name: 'Trekking', selected: false, icon: 'assets/images/filter-packages/trekking.png'},
    {name: 'Waterway', selected: false, icon: 'assets/images/filter-packages/waterway.png'},
    {name: 'Cave', selected: false, icon: 'assets/images/filter-packages/cave.png'},
    {name: 'Others', selected: false, icon: 'assets/images/filter-packages/others.png'},
  ];
  constructor(private route: ActivatedRoute, private router: Router,
              private tourPackageService: TourPackageService,
              private azureBlobStorageService: AzureBlobStorageService,
              private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.tourForm = this.formBuilder.group({
      id: [{value: null}],
      img: [{value: null}, Validators.required],
      destiny: [{value: null}, Validators.required],
      title: [{value: ''}, Validators.required],
      description: [{value: null}, Validators.required],
      agency: [{value: null}],
      price: [{value: null}, Validators.required],
      regionId: [{value: null}],
      visible: [{value: false}]
    });
    this.tourForm.patchValue(this.tourPackage)
    this.route.params.subscribe(params => {
        const packageId = params['packageId'];
        console.log("packageId", packageId)
        if (packageId != null) {
          this.title = "Edit Tour Package";
          this.getPackageById(packageId);
        }
      }
    );
  }
  getPackageById(packageId: number) {
    this.tourPackageService.getPackageById(packageId).subscribe(packageData => {
      console.log("packageData", packageData);
      this.tourPackage = packageData;
      this.tourForm.patchValue(this.tourPackage);
    });
  }

  back() {
    this.router.navigate(['peru/tour-packages/my-packages']);
  }


  onFileSelected($event: any) {
    const file = $event.target.files[0];
    this.azureBlobStorageService.uploadImage(file, this.tourPackage.id.toString()).then(url => {
        this.tourPackage.img = url;
        this.tourForm.patchValue({img: url});
      }
    );
  }

  get hasImg() {
    return this.tourForm.get('img')?.value != null;
  }
  get isVisible() {
    return this.tourForm.get('visible')?.value;
  }

}
