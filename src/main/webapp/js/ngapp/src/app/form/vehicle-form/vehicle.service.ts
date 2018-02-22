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
import { User } from '../../dashboard/components/user/user.interface';
import { AppConstants } from '../../app.constants';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthGuard } from '../../authentication/_guards/auth.guard';

@Injectable()
export class VehicleService {


  vehicles: IVehicle[] = [];

  constructor(
    private http: Http,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private authGuard: AuthGuard,

  ) {
  }
  /***********************************************/
  /* Getting Vehicle Data */

  getVehicles(): Observable<IVehicle[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    return this.http.get(AppConstants.VEHICLE_SHOWALL_URL, { headers: headers })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getVehicleById(id): Observable<IVehicle[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    return this.http.get(AppConstants.VEHICLE_SHOW_BY_ID_URL + id, { headers: headers })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getVehicleMarks(): Observable<IVehicleMark[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    return this.http.get(AppConstants.VEHICLE_SHOW_MARK_URL, { headers: headers })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getVehicleModels(): Observable<IVehicleModel[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    return this.http.get(AppConstants.VEHICLE_SHOW_MODEL_URL, { headers: headers })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /***********************************************/
  /* Adding Vehicle Data                         */
  addVehicleMark(form: NgForm): Promise<IVehicleMark[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('mark', JSON.stringify(form.value));
    this.messageService.showMessage('success', 'Success', 'Vehicle Mark has been submitted.');
    return this.http
      .post(AppConstants.VEHICLE_ADD_MARK_URL, formData, { headers: headers })
      .toPromise()
      .then(() => form)
      .catch(this.handleError);
  }

  addVehicleModel(form: NgForm): Promise<IVehicleMark[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('model', JSON.stringify(form.value));
    this.messageService.showMessage('success', 'Success', 'Vehicle Model has been submitted.');
    return this.http
      .post(AppConstants.VEHICLE_ADD_MODEL_URL, formData, { headers: headers })
      .toPromise()
      .then(() => form)
      .catch(this.handleError);
  }
  /***********************************************/
  /* Edit Vehicle Data */
  editVehicleById(selectedVehicleId, formValue): Promise<IVehicle> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('id', JSON.stringify(selectedVehicleId));
    formData.append('vehicle', JSON.stringify(formValue));
    return this.http
      .post(AppConstants.VEHICLE_EDIT_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }

  editVehicleMarkById(formValue): Promise<IVehicle> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('mark', JSON.stringify(formValue));
    return this.http
      .post(AppConstants.VEHICLE_EDIT_MARK_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }
  editVehicleModelById(formValue, mark_id): Promise<IVehicle> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('model', JSON.stringify(formValue));
    formData.append('mark_id', mark_id);
    return this.http
      .post(AppConstants.VEHICLE_EDIT_MODEL_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }

  /***********************************************/
  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
