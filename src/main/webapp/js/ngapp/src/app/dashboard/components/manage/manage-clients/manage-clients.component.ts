import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule, LazyLoadEvent, FilterMetadata, ConfirmationService } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { VehicleService } from '../../new/vehicle/vehicle.service';
import { MessageService } from '../../common/message/message.service';
import { IVehicle } from '../../new/vehicle/vehicle.interface';
import { ContextMenuModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css'],
  providers: [VehicleService, MessageService, ConfirmationService]
})
export class ManageClientsComponent implements OnInit {

  selectedVehicle: IVehicle;
  vehicles: IVehicle[] = [];
  totalRecords: number;
  items: MenuItem[];
  selectVehicles: IVehicle[];

  constructor(
    private service: VehicleService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.service.getAllVehicles().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
        this.totalRecords = this.vehicles.length;
      }
    );

    this.items = [
      { label: 'Edit', icon: 'fa-search', command: (event) => this.router.navigate(['/dashboard/data/' + this.selectedVehicle.id]) },
      { label: 'Remove', icon: 'fa-close', command: (event) => this.confirmDeletion(this.selectedVehicle.id) },
    ];

  }

  onSelect() {
    // If enable/disable is found as a context menu selection
    // It is getting removed
    if (this.items.find(x => x.label === 'Enable') || this.items.find(x => x.label === 'Disable')) {
      this.items.pop();
    }
    // If there are no context menu selections for disable/enable
    // It's going to be pushed in
    if (this.selectedVehicle.disabled === true) {
      this.items.push(
        {
          label: 'Enable', icon: 'fa-search', command: (event) => {
            this.service.enableVehicleById(this.selectedVehicle.id).then(
              () => { this.ngOnInit(); }
            );
          }
        });
    } else if (this.selectedVehicle.disabled === false) {
      this.items.push(
        {
          label: 'Disable', icon: 'fa-search', command: (event) => {
            this.service.disableVehicleById(this.selectedVehicle.id).then(
              () => { this.ngOnInit(); }
            );
          }
        });
    }

  }

  removeVehicle(id) {
    this.service.removeVehicleById(id).then(
      () => { this.ngOnInit(); }
    );
  }
  confirmDeletion(id) {
    this.confirmationService.confirm({
      message: 'You are going to delete vehicle with the id: ' + id + ' are you sure?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.messageService.showMessage('success', 'Success', 'Vehicle deleted successfully.');
        this.removeVehicle(id);
      },
      reject: () => {
        this.messageService.showMessage('info', 'Info', 'Vehicle has not been deleted.');
      }
    });
  }

}
