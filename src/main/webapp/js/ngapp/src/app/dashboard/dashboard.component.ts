import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthenticationService]
})
export class DashboardComponent {
  displayDialogModel: boolean;
  displayDialogMark: boolean;


  constructor(
    private authenticationService: AuthenticationService,
  ) {
  }

  showNewModel() {
    if (this.authenticationService.returnUserRole() === 'admin') {
      this.displayDialogModel = true;
    }
  }
  showNewMark() {
    if (this.authenticationService.returnUserRole() === 'admin') {
      this.displayDialogMark = true;
    }
  }


}
