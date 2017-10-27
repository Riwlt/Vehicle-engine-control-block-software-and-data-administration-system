import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DatatableService } from './datatable.service';
import { Datatable } from './datatable.interface';
import { Vehicle } from '../../../form/vehicle-form/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  providers: [DatatableService]
})
export class DatatableComponent implements OnInit {

  selectedVehicle: Datatable;

  vehicles: Datatable[] = [];

  constructor(private service: DatatableService, private router: Router) { }

  ngOnInit() {
    this.service.getVehicles().then(vehicles => this.vehicles = vehicles);
  }

  onRowSelect(event) {
    this.router.navigate(['/dashboard/data', this.selectedVehicle.id]);

  }



}
