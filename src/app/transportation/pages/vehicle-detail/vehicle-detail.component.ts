import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../identity-access-management/services/user.service";
import {TransportService} from "../../services/transport.service";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AzureBlobStorageService} from "../../../tour-experience/services/azure-blob-storage.service";
import {Vehicle} from "../../models/vehicle.model";
import {VEHICLE_STATUS} from "../../enums/vehicle-status.enum";

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  private dialog: MatDialogRef<SpinnerComponent> | undefined;
  isEdit: any;
  title: string = 'Add Vehicle'
  vehicleForm: FormGroup = new FormGroup({});
  vehicle: Vehicle = new Vehicle();
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private transportService: TransportService,
              private matDialog: MatDialog,
              private azureBlobStorageService: AzureBlobStorageService,
              private formBuilder: FormBuilder) {
    this.vehicleForm = this.formBuilder.group({
        id: [''],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        plate: ['', Validators.required],
        capacity: ['', Validators.required],
        agencyId: [''],
        driverName: ['', Validators.required],
        weight: ['', Validators.required],
        img: ['', Validators.required],
        status: ['', Validators.required]
      }
    );
    this.vehicleForm.get('agencyId')?.setValue(this.userService.getUserIdFromCookies());
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const vehicleId = params['vehicleId'];
      this.vehicle.id = vehicleId;
      if (vehicleId) {
        this.isEdit = true;
        this.title = 'Edit Vehicle';
        this.vehicleForm.get('id')?.setValue(vehicleId);
        this.getVehicleById(vehicleId);
      }
    });
  }

  back() {
    this.router.navigate(['peru/transportation/my-vehicles']);
  }

  private getVehicleById(vehicleId: number) {
    this.showSpinnerDialog()
    this.vehicleForm.reset()
    this.vehicleForm.patchValue({agencyId: this.userService.getUserIdFromCookies(), id: vehicleId});
    this.transportService.getTransportationById(vehicleId).subscribe((vehicle) => {
        this.vehicle = vehicle;
        this.vehicleForm.patchValue(vehicle);
        this.hideSpinnerDialog();
      }
    );
  }

  onFileSelected($event: any) {
    this.showSpinnerDialog();
    const file = $event.target.files[0];
    this.azureBlobStorageService.uploadImage(file).then(url => {
        this.vehicle.img = url;
        this.vehicleForm.patchValue({img: url});
        if (this.vehicle.id) {
          this.transportService.modifyImage(this.vehicle.id, url).subscribe();
        }
        this.hideSpinnerDialog();
      }
    );
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
  get hasImg() {
    return this.vehicleForm.get('img')?.value != null;
  }

  saveVehicle() {
    this.showSpinnerDialog();
    if (this.isEdit) {
      this.transportService.modifyTransportation(this.vehicle.id, this.vehicleForm.value).subscribe(() => {
        this.hideSpinnerDialog();
        this.getVehicleById(this.vehicle.id)
      });
    } else {
      this.transportService.createTransportation(this.vehicleForm.value).subscribe(() => {
        this.hideSpinnerDialog();
        this.back()
      });
    }
  }

  protected readonly VEHICLE_STATUS = VEHICLE_STATUS;

  setStatus(status: VEHICLE_STATUS) {
    this.vehicleForm.patchValue({status: status});
  }
  get getStatus() {
    return this.vehicleForm.get('status')?.value;
  }
}
