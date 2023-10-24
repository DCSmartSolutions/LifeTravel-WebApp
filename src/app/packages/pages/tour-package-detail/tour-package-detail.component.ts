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
  subtitle: string = "Create";
  tourForm: FormGroup = new FormGroup({})

  constructor(private route: ActivatedRoute, private router: Router,
              private tourPackageService: TourPackageService,
              private azureBlobStorageService: AzureBlobStorageService,
              private formBuilder: FormBuilder,) {

  }

  ngOnInit() {
    this.tourForm = this.formBuilder.group({
        id: [{value: null}],
        img: [{value: null}, Validators.required],
        destiny: [{value: null}, Validators.required],
        title: [{value: null}, Validators.required],
        description: [{value: null}, Validators.required],
        agency: [{value: null}],
        price: [{value: null}, Validators.required],
        regionId: [{value: null}],
      }
    );
    this.route.params.subscribe(params => {
        const packageId = params['packageId'];
        console.log("packageId", packageId)
        if (packageId) {
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
  get hasImg(){
    return this.tourPackage.img;
  }
}
