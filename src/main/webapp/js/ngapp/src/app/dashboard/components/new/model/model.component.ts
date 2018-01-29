import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../common/message/message.service';
import { VehicleService } from '../../../../form/vehicle-form/vehicle.service';
import { IVehicleMark } from '../../../../form/vehicle-form/vehicle.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  providers: [MessageService, VehicleService]
})
export class ModelComponent implements OnInit {

  vehicleMarks: IVehicleMark[] = [];

  constructor(
    private messageService: MessageService,
    private vehicleService: VehicleService,
  ) { }

  ngOnInit() {
    // Grabbing mark list from VehicleService
    this.vehicleService.getVehicleMarks().then(
      vehicleMarks => this.vehicleMarks = vehicleMarks
    );
  }

  addVehicleModel(form: NgForm) {
    this.vehicleService.addVehicleModel(form);
  }
}
