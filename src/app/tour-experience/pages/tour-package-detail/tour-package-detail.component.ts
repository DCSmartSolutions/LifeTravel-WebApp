import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LocationName, TourPackage} from "../../models/tour-package.model";
import {TourPackageService} from "../../services/tour-package.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AzureBlobStorageService} from "../../services/azure-blob-storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {Location} from "../../models/tour-package.model";
import {MapComponent} from "../../components/map/map.component";
import {Subject} from "rxjs";
@Component({
  selector: 'app-tour-package-detail',
  templateUrl: './tour-package-detail.component.html',
  styleUrls: ['./tour-package-detail.component.scss']
})
export class TourPackageDetailComponent implements OnInit {
  title: string = "Add New Tour Package";
  tourPackage: TourPackage = new TourPackage();
  tourForm: FormGroup = new FormGroup({});
  private dialog: MatDialogRef<SpinnerComponent> | undefined;
  activities: any[] = [
    {name: 'Trekking', selected: false, icon: 'assets/images/filter-packages/trekking.png'},
    {name: 'Waterway', selected: false, icon: 'assets/images/filter-packages/waterway.png'},
    {name: 'Cave', selected: false, icon: 'assets/images/filter-packages/cave.png'},
    {name: 'Others', selected: false, icon: 'assets/images/filter-packages/others.png'},
  ];
  dayList: any[] = [
    {name:'Monday', selected: false},
    {name:'Tuesday', selected: false},
    {name:'Wednesday', selected: false},
    {name:'Thursday', selected: false},
    {name:'Friday', selected: false},
    {name:'Saturday', selected: false},
    {name:'Sunday', selected: false},
  ];
  displayNameLocation: any;
  destinations: LocationName[] = []
  constructor(private route: ActivatedRoute, private router: Router,
              private tourPackageService: TourPackageService,
              private azureBlobStorageService: AzureBlobStorageService,
              private matDialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.tourForm = this.formBuilder.group({
      id: [{value: null}],
      img: [{value: null}, Validators.required],
      destiny: [{value: null}, Validators.required],
      title: [{value: ''}, Validators.required],
      description: [{value: ""}, Validators.required],
      agency: [{value: null}],
      price: [{value: null}, Validators.required],
      regionId: [{value: null}],
      visible: [{value: false}],
      meetingPoint: [{value: null}],
      meetingPointLatitude: [{value: null}, Validators.required],
      meetingPointLongitude: [{value: null}, Validators.required],
      destinations: [{value: null}],
    });
    this.tourForm.patchValue(this.tourPackage)
    console.log("this.tourForm", Object.assign({}, this.tourForm.getRawValue()))
  }
  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
        const packageId = params['packageId'];
        console.log("packageId", packageId)
        if (packageId != null) {
          this.title = "Edit Tour Package";
          this.getPackageById(packageId);
        }else{
          this.getUserLocation();
        }
      }
    );

  }
  getUserLocation() {
    //console.log("getLocation")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.setUserLocation(position));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  setUserLocation(position: GeolocationPosition) {
    this.tourForm.patchValue({meetingPointLatitude: position.coords.latitude});
    this.tourForm.patchValue({meetingPointLongitude: position.coords.longitude});
    this.tourForm.patchValue({meetingPoint: new Location(position.coords.latitude, position.coords.longitude)});
  }

  getPackageById(packageId: number) {
    this.tourPackageService.getPackageById(packageId).subscribe(packageData => {
      console.log("packageData", packageData);
      this.tourPackage = packageData;
      this.tourForm.patchValue(this.tourPackage);
      this.tourForm.patchValue({meetingPointLatitude: packageData.meetingPoint?.latitude});
      this.tourForm.patchValue({meetingPointLongitude: packageData.meetingPoint?.longitude});
      this.destinations = packageData.destinations;
      console.log("this.tourForm", this.tourForm)
    });
  }

  back() {
    this.router.navigate(['peru/tour-packages/my-packages']);
  }


  onFileSelected($event: any) {
    this.showSpinnerDialog();
    const file = $event.target.files[0];
    this.azureBlobStorageService.uploadImage(file).then(url => {
        this.tourPackage.img = url;
        this.tourForm.patchValue({img: url});
        if (this.tourPackage.id) {
          this.tourPackageService.modifyImage(this.tourPackage.id, url).subscribe();
        }
        this.hideSpinnerDialog();
      }
    );
  }

  get hasImg() {
    return this.tourForm.get('img')?.value != null;
  }

  get isVisible() {
    return this.tourForm.get('visible')?.value;
  }

  showSpinnerDialog() {
    this.dialog = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true
    });
  }

  hideSpinnerDialog() {
    this.dialog?.close();
  }

  getDisplayName($event: string) {
    this.displayNameLocation = $event;
    //console.log("displayNameLocation", this.displayNameLocation);
  }
  get hasMeetingPoint() {
    return this.tourForm.get('meetingPoint')?.value != null;
  }

  getNewLocation($event: Location) {
    //console.log("getNewLocation", $event)
    this.tourForm.patchValue({meetingPoint: $event});
  }

  getDestinationList($event: any[]) {
    this.destinations = $event;
    //console.log("getDestinationList", this.destinations)
  }
  removeDestination(index: number) {
    this.tourForm.get('destinations')?.value.splice(index, 1);
    console.log(this.tourForm.get('destinations')?.value)
    this.emitEventToChild()
    //this.mapComponent?.refreshMap(destinations);
  }
  savePackage() {
    this.showSpinnerDialog();
    this.tourForm.patchValue({destinations: this.destinations});
    this.tourForm.get('meetingPoint')?.setValue(new Location(this.tourForm.get('meetingPointLatitude')?.value, this.tourForm.get('meetingPointLongitude')?.value));
    this.tourPackage = Object.assign({}, this.tourForm.getRawValue()) as TourPackage;
    this.tourPackageService.modifyPackage(this.tourPackage.id, this.tourPackage).subscribe(()=>{
        this.hideSpinnerDialog()
      }
    );
  }

  selectDay(item: any) {
    item.selected = !item.selected;
    //this.tourForm.patchValue({dayList: this.dayList});
  }
}
