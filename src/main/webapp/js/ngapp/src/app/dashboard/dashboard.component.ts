import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthenticationService]
})
export class DashboardComponent {


  constructor(
    private authenticationService: AuthenticationService
  ) {


  }
  logoutAuth() {
    this.authenticationService.logout();
  }
}
