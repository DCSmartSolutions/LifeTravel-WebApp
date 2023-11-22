import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from "../../models/vehicle.model";
import {TransportService} from "../../services/transport.service";

@Component({
  selector: 'app-vehicle-grid',
  templateUrl: './vehicles-grid.component.html',
  styleUrls: ['./vehicles-grid.component.scss']
})
export class VehiclesGridComponent {
  @Input() existingVehicles: Vehicle[] = [];
}
