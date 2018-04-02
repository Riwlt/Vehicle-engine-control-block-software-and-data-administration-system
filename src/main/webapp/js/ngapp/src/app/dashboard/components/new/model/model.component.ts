import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../common/message/message.service';
import { VehicleService } from '../../new/vehicle/vehicle.service';
import { IVehicleMark } from '../../new/vehicle/vehicle.interface';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../../authentication/authentication.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  providers: [MessageService, VehicleService, AuthenticationService]
})
export class ModelComponent implements OnInit {

  vehicleMarks: IVehicleMark[] = [];

  constructor(
    private messageService: MessageService,
    private vehicleService: VehicleService,
  ) { }

  ngOnInit() {
    // Grabbing mark list from VehicleService
    this.vehicleService.getVehicleMarks().subscribe(
      vehicleMarks => this.vehicleMarks = vehicleMarks
    );
  }

  addVehicleModel(form: NgForm) {
    if (form.valid) {
      this.vehicleService.addVehicleModel(form);
    }
  }
}
