import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../common/message/message.service';
import { VehicleService } from '../../../../form/vehicle-form/vehicle.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css'],
  providers: [MessageService, VehicleService]
})
export class MarkComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
  }

  addVehicleMark(form: NgForm) {
    this.vehicleService.addVehicleMark(form);
  }
}
