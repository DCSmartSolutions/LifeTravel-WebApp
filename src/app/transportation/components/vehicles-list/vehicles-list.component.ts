import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from "../../models/vehicle.model";
import {TransportService} from "../../services/transport.service";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent {
  @Input() existingVehicles: Vehicle[] = [];
}
