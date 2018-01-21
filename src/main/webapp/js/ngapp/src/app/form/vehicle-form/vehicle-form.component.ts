import { Component, OnInit } from '@angular/core';
import { Vehicle } from './vehicle';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { VehicleService } from './vehicle.service';
import { IVehicle, IVehicleMark, IVehicleModel } from './vehicle.interface';
import { NgForm, FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { MessageService } from '../../dashboard/components/common/message/message.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  providers: [VehicleService, MessageService]
})

export class VehicleFormComponent implements OnInit {
  private vehicleUrl = 'http://localhost:8080/upload';
  private headers = new Headers({});
  files: File;
  vehicles: IVehicle[] = [];
  vehicleMarks: IVehicleMark[] = [];
  vehicleModels: IVehicleModel[] = [];
  selectedVehicleModels: String[];
  selectedVehicle: number;
  chosen = false;
  modelValue: string;
  //form: FormGroup;

  // Consider doing FormBuilder for forms and then validate etc.
  constructor(
    // private fb: FormBuilder,
    private service: VehicleService,
    private messageService: MessageService,
    private http: Http) {
    this.getVehicles();
    this.getMarks();
    this.getModels();
  }

  ngOnInit(): void {

  }
  // Get vehicle marks
  getMarks() {
    this.service.getVehicleMarks().then(
      vehicleMarks => this.vehicleMarks = vehicleMarks
    );
  }
  // Get vehicle models
  getModels() {
    this.service.getVehicleModels().then(
      vehicleModels => this.vehicleModels = vehicleModels
    );
  }
  // Get all vehicle data
  getVehicles() {
    this.service.getVehicles().then(
      vehicles => this.vehicles = vehicles
    );
  }

  onMarkChange(value) {
    this.selectedVehicleModels = [];
    // Activate model field
    this.chosen = true;
    // Grabbing the mark_id
    for (let i = 0; i < this.vehicleMarks.length; i++) {
      if (value === this.vehicleMarks[i].markName) {
        this.selectedVehicle = this.vehicleMarks[i].id;
      }
    }
    // Grabbing the models of selected mark
    this.vehicleModels.forEach(element => {
      if (this.selectedVehicle === element.mark_id) {
        this.selectedVehicleModels.push(element.modelName);
      }
    });
  }
  // Getting files from form field
  getFiles(event) {
    this.files = event.srcElement.files;
  }


  // Adding data to FormData object and sending to backend
  add(form: NgForm): Promise<IVehicle> {
    let formData: FormData = new FormData();
    formData.append('vehicle', JSON.stringify(form.value));
    formData.append('file', this.files[0]);
    this.messageService.showMessage('info', 'Info', 'Vehicle has been submitted.');
    return this.http
      .post(this.vehicleUrl, formData, { headers: this.headers })
      .toPromise()
      .then(() => form)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // Message growl here isn't working atm
    this.messageService.showMessage('error', 'Error', 'Vehicle has not been added.');
    return Promise.reject(error.message || error);
  }
}
