import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-ng-view',
  template: `
  <nav>
  <a routerLink="/vehicleform" >Vehicle</a>
  <br>
  <a routerLink="/">Something</a>
  <br>
  <a routerLink="/dashboard">Something</a>
  </nav>
  <router-outlet></router-outlet>`
})

export class AppComponent {
  title = 'Tour of Heroes';

}
