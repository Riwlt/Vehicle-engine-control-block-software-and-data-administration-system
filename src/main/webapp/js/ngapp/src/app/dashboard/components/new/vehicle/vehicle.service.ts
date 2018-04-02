import { Injectable } from '@angular/core';
import { Http, Response, BrowserXhr, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { IVehicle, IVehicleMark, IVehicleModel, IVehicleFile } from './vehicle.interface';
import { MessageService } from '../../common/message/message.service';
import { NgForm } from '@angular/forms';
import { User } from '../../user/user.interface';
import { AppConstants } from '../../../../app.constants';
import { AuthenticationService } from '../../../../authentication/authentication.service';
import { AuthGuard } from '../../../../authentication/_guards/auth.guard';

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
  getAllVehicles(): Observable<IVehicle[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    return this.http.get(AppConstants.VEHICLE_SHOWALL_DISABLED_URL, { headers: headers })
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
  getVehicleFilesByVehicleId(id): Observable<IVehicleFile[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    headers.append('Content-type', 'application/json');
    headers.append('responseType', 'arraybuffer');
    return this.http.get(AppConstants.VEHICLE_SHOW_FILE_BY_VEHICLE_ID_URL + id, { headers: headers })
      .map(result => result.json() as IVehicleFile[])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getVehicleFilesByFileId(id): Observable<IVehicleFile[]> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    return this.http.get(AppConstants.VEHICLE_SHOW_FILE_BY_FILE_ID_URL + id, { headers: headers })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getVehicleFullLength(): Observable<number> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    return this.http.get(AppConstants.VEHICLE_GET_LENGTH_URL, { headers: headers })
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
  addVehicleFileById(file: File, fileName, vehicleId) {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('vehicleId', vehicleId);
    formData.append('fileName', fileName);
    this.messageService.showMessage('success', 'Success', 'Vehicle file has been successfully submitted.');
    return this.http
      .post(AppConstants.VEHICLE_ADD_FILE_BY_VEHICLE_ID_URL, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }
  addVehicle(vehicleData, customerData): Promise<IVehicle> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('vehicle', JSON.stringify(vehicleData));
    formData.append('customerData', JSON.stringify(customerData));
    this.messageService.showMessage('info', 'Info', 'Vehicle has been submitted.');
    return this.http
      .post(AppConstants.VEHICLE_UPLOAD_URL, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }
  enableVehicleById(id): Promise<any> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('id', id);
    this.messageService.showMessage('info', 'Info', 'enabled');
    return this.http
      .post(AppConstants.VEHICLE_ENABLE_URL, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }
  /***********************************************/
  /* Edit Vehicle Data */
  editVehicleById(selectedVehicleId, formValue, customerData): Promise<IVehicle> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('id', JSON.stringify(selectedVehicleId));
    formData.append('vehicle', JSON.stringify(formValue));
    formData.append('customerData', JSON.stringify(customerData));
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
  ////////////////////////////////////////////////
  // Remove vehicle Data
  disableVehicleFileById(id): Promise<any> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    this.messageService.showMessage('success', 'Success', 'File removed successfully.');
    formData.append('disableId', id);
    return this.http
      .post(AppConstants.VEHICLE_DISABLE_FILE_BY_ID_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }
  removeVehicleModelById(id): Promise<any> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    this.messageService.showMessage('success', 'Success', 'Model removed successfully.');
    formData.append('id', id);
    return this.http
      .post(AppConstants.VEHICLE_REMOVE_MODEL_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }
  removeVehicleMarkById(dialogMark): Promise<any> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('id', dialogMark.id);
    this.messageService.showMessage('success', 'Success', 'Mark removed successfully.');
    return this.http
      .post(AppConstants.VEHICLE_REMOVE_MARK_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }
  removeVehicleById(id): Promise<any> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('id', id);
    this.messageService.showMessage('success', 'Success', ' successfully.');
    return this.http
      .post(AppConstants.VEHICLE_REMOVE_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }
  disableVehicleById(id): Promise<any> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('id', id);
    this.messageService.showMessage('success', 'Success', ' successfully.');
    return this.http
      .post(AppConstants.VEHICLE_DISABLE_URL, formData, { headers: headers })
      .toPromise()
      .catch(error => this.handleError(error));
  }
  /***********************************************/
  // Converting byte array to String
  convertString(string): Promise<any> {
    const headers = new Headers();
    this.authenticationService.createAuthorizationHeader(headers);

    const formData: FormData = new FormData();
    formData.append('fileBlob', string);
    return this.http.post(AppConstants.VEHICLE_BYTEARRAY_TO_STRING_CONVERT_URL, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }
  /////////////////////////////



  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
