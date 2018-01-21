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


@Injectable()
export class VehicleService {
  private vehicleUrl = 'http://localhost:8080/showall';
  private vehicleByIdUrl = 'http://localhost:8080/showone?id=';
  private vehicleMark = 'http://localhost:8080/showall/mark';
  private vehicleModel = 'http://localhost:8080/showall/model';

  constructor(private http: Http,
    private messageService: MessageService) { }

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

  editVehicleById(selectedVehicleId, formValue, editVehicleUrl, headers): Promise<IVehicle> {
    let formData: FormData = new FormData();
    formData.append('id', JSON.stringify(selectedVehicleId));
    formData.append('vehicle', JSON.stringify(formValue));
    return this.http
      .post(editVehicleUrl, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.messageService.showMessage('success', 'Success', 'Vehicle has been added!');
    return Promise.reject(error.message || error);
  }
}
