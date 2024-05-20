import { Component, Inject, OnInit } from '@angular/core';
import { TransportService } from '../../services/transport.service';
import { Vehicle } from '../../models/vehicle.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VEHICLE_STATUS } from '../../enums/vehicle-status.enum';

class DialogData {
  constructor(public vehicle: Vehicle) {}
}

@Component({
  selector: 'app-add-vehicle-modal',
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.scss'],
})
export class AddVehicleModalComponent implements OnInit {
  availableVehicles: Vehicle[] = [];
  previousVehicle: Vehicle | null = null;
  vehicle: Vehicle | null = null;

  constructor(
    private transportService: TransportService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit() {
    this.transportService
      .getAllTransportationsByAgencyId(VEHICLE_STATUS.OPERATIONAL)
      .subscribe((vehicles: Vehicle[]) => {
        this.previousVehicle = this.data.vehicle;
        if (this.previousVehicle) {
          this.availableVehicles = vehicles.filter(
            (vehicle) =>
              vehicle.id !== this.previousVehicle?.id &&
              vehicle.weight >= this.previousVehicle!.weight &&
              vehicle.capacity >= this.previousVehicle!.capacity,
          );
        } else this.availableVehicles = vehicles;
      });
  }
}
