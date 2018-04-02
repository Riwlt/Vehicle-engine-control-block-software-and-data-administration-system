import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { VehicleService } from '../new/vehicle/vehicle.service';
import { MessageService } from '../common/message/message.service';
import { IVehicle } from '../new/vehicle/vehicle.interface';
import { AuthenticationService } from '../../../authentication/authentication.service';


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  providers: [VehicleService, MessageService]
})
export class DatatableComponent implements OnInit {

  selectedVehicle: IVehicle;
  vehicles: IVehicle[] = [];
  totalRecords: number;
  loading: boolean;

  constructor(
    private service: VehicleService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.service.getVehicles().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
        this.totalRecords = this.vehicles.length;
      }
    );



  }

  loadVehiclesLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.vehicles) {
        this.vehicles = this.vehicles.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 500);
  }
  // Padaryt kad jeigu nerastas id rejectintu
  onRowSelect(event) {
    this.router.navigate(['/dashboard/data', this.selectedVehicle.id]);
  }


}
