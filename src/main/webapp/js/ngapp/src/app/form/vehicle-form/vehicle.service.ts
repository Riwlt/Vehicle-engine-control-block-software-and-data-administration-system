import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { IVehicle, IVehicleMark, IVehicleModel } from './vehicle.interface';
import { MessageService } from '../../dashboard/components/common/message/message.service';
import { NgForm } from '@angular/forms';


@Injectable()
export class VehicleService {
  private vehicleUrl = 'http://localhost:8080/showall';
  private vehicleByIdUrl = 'http://localhost:8080/showone?id=';
  private vehicleMark = 'http://localhost:8080/showall/mark';
  private vehicleModel = 'http://localhost:8080/showall/model';
  private vehicleMarkAddUrl = 'http://localhost:8080/add/mark';
  private vehicleModelAddUrl = 'http://localhost:8080/add/model';
  private headers = new Headers({});

  constructor(
    private http: Http,
    private messageService: MessageService
  ) { }

  /***********************************************/
  /* Getting Vehicle Data */

  getVehicles(): Promise<IVehicle[]> {
    return this.http.get(this.vehicleUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getVehicleById(id): Promise<IVehicle[]> {
    return this.http.get(this.vehicleByIdUrl + id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getVehicleMarks(): Promise<IVehicleMark[]> {
    return this.http.get(this.vehicleMark)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getVehicleModels(): Promise<IVehicleModel[]> {
    return this.http.get(this.vehicleModel)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  /***********************************************/
  /* Adding Vehicle Data                         */

  addVehicleMark(form: NgForm): Promise<IVehicleMark[]> {
    let formData: FormData = new FormData();
    formData.append('mark', JSON.stringify(form.value));
    this.messageService.showMessage('success', 'Success', 'Vehicle Mark has been submitted.');
    return this.http
      .post(this.vehicleMarkAddUrl, formData, {headers: this.headers })
      .toPromise()
      .then(() => form)
      .catch(this.handleError);
  }

  addVehicleModel(form: NgForm): Promise<IVehicleMark[]> {
    let formData: FormData = new FormData();
    formData.append('model', JSON.stringify(form.value));
    this.messageService.showMessage('success', 'Success', 'Vehicle Model has been submitted.');
    return this.http
      .post(this.vehicleModelAddUrl, formData, {headers: this.headers })
      .toPromise()
      .then(() => form)
      .catch(this.handleError);
  }
  /***********************************************/
  /* Edit Vehicle Data */
  editVehicleById(selectedVehicleId, formValue, editVehicleUrl, headers): Promise<IVehicle> {
    let formData: FormData = new FormData();
    formData.append('id', JSON.stringify(selectedVehicleId));
    formData.append('vehicle', JSON.stringify(formValue));
    return this.http
      .post(editVehicleUrl, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  /***********************************************/
  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.messageService.showMessage('error', 'Error', 'Error with adding the vehicle!');
    return Promise.reject(error.message || error);
  }
}
