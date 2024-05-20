import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent {
  @Input() vehicle: Vehicle = new Vehicle();
  constructor(private router: Router) {}
  goToVehicleDetail() {
    this.router.navigate([`/transportation/vehicle-detail/${this.vehicle.id}`]);
  }
}
