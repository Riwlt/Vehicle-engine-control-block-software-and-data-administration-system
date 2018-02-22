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
import { AppConstants } from '../../app.constants';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthGuard } from '../../authentication/_guards/auth.guard';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  providers: [VehicleService, MessageService, AuthenticationService]
})

export class VehicleFormComponent implements OnInit {
  files: File;
  vehicles: IVehicle[] = [];
  vehicleMarks: IVehicleMark[] = [];
  vehicleModels: IVehicleModel[] = [];
  selectedVehicleModels: String[];
  selectedVehicle: number;
  chosen = false;

  constructor(
    // private fb: FormBuilder,
    private service: VehicleService,
    private messageService: MessageService,
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getVehicles();
    this.getMarks();
    this.getModels();
  }
  // Get vehicle marks
  // Fix this
  getMarks() {
    this.service.getVehicleMarks().subscribe(
      (vehicleMarks) => { this.vehicleMarks = vehicleMarks; },
      (err) => { console.log(err); }
    );
  }
  // Get vehicle models
  getModels() {
    this.service.getVehicleModels().subscribe(
      (vehicleModels) => { this.vehicleModels = vehicleModels; },
      (err) => { console.log(err); }
    );
  }
  // Get all vehicle data
  getVehicles() {
    this.service.getVehicles().subscribe(
      (vehicles) => { this.vehicles = vehicles; },
      (err) => { console.log(err); }
    );
  }

  onMarkChange(value) {
    this.selectedVehicleModels = [];
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
      this.chosen = true;
    });
  }
  // Getting files from form field
  getFiles(event) {
    this.files = event.srcElement.files;
  }

  // Adding data to FormData object and sending to backend
  add(form: NgForm): Promise<IVehicle> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('vehicle', JSON.stringify(form.value));
    formData.append('file', this.files[0]);
    this.messageService.showMessage('info', 'Info', 'Vehicle has been submitted.');
    return this.http
      .post(AppConstants.VEHICLE_UPLOAD_URL, formData, { headers: headers })
      .toPromise()
      .then(() => form)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
