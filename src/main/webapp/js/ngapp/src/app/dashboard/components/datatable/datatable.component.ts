import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Vehicle } from '../../../form/vehicle-form/vehicle';
import { Router } from '@angular/router';
import { VehicleService } from '../../../form/vehicle-form/vehicle.service';
import { MessageService } from '../common/message/message.service';
import { IVehicle } from '../../../form/vehicle-form/vehicle.interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  providers: [VehicleService, MessageService]
})
export class DatatableComponent implements OnInit {

  selectedVehicle: IVehicle;

  vehicles: IVehicle[] = [];

  constructor(
    private service: VehicleService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.getVehicles().then(vehicles => this.vehicles = vehicles);

  }

  onRowSelect(event) {
    this.router.navigate(['/dashboard/data', this.selectedVehicle.id]);
  }

}
