import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../../models/vehicle.model";
import {TransportService} from "../../services/transport.service";
import {VEHICLE_STATUS} from "../../enums/vehicle-status.enum";

@Component({
  selector: 'app-existing-vehicle-list',
  templateUrl: './existing-vehicle-list.component.html',
  styleUrls: ['./existing-vehicle-list.component.scss']
})
export class ExistingVehicleListComponent implements OnInit {
  existingVehicles: Vehicle[] = [];
  constructor(private transportService: TransportService) {}
  addVehicle() {
  }
  ngOnInit() {
    this.transportService.getAllTransportationsByAgencyId().subscribe((vehicles: Vehicle[]) => {
        this.existingVehicles = vehicles;
      }
    );
  }

  getExistingVehiclesByStatus(status: VEHICLE_STATUS) {
    this.selectedStatus = status.replace('_', ' ');
    this.transportService.getAllTransportationsByAgencyId(status).subscribe((vehicles: Vehicle[]) => {
        this.existingVehicles = vehicles;
      }
    );
  }

  protected readonly VEHICLE_STATUS = VEHICLE_STATUS;
  selectedStatus: string = '';
}
