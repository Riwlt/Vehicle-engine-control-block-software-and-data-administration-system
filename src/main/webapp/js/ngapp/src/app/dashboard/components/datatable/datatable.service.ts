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
import { Datatable } from './datatable.interface';
import { MessageService } from './../common/message/message.service';

@Injectable()
export class DatatableService {
  private vehicleUrl = 'http://localhost:8080/showall';

  constructor(private http: Http) { }

  getVehicles(): Promise<Datatable[]> {
    return this.http.get(this.vehicleUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    return Promise.reject(error.message || error);
  }
}
