import { Component, OnInit } from '@angular/core';
import { Vehicle } from './vehicle';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { VehicleService } from './vehicle.service';
import { IVehicle } from './vehicle.interface';
import { NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  providers: [VehicleService]
})

export class VehicleFormComponent implements OnInit {
  private vehicleUrl = 'http://localhost:8080/upload';
  private headers = new Headers({});
  files: File;
  vehicles: IVehicle[] = [];
  constructor(private service: VehicleService,
    private http: Http) {
    this.getVehicles();
  }


  ngOnInit(): void {

  }

  getVehicles() {
    this.service.getVehicles().then(
      vehicles => this.vehicles = vehicles
    );
  }

  getFiles(event) {
    this.files = event.srcElement.files;
  }

  add(form: NgForm): Promise<IVehicle> {
    let formData: FormData = new FormData();
    formData.append('vehicle', JSON.stringify(form.value));
    formData.append('file', this.files[0]);
    return this.http
      .post(this.vehicleUrl, formData, { headers: this.headers })
      .toPromise()
      .then(() => form)
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
