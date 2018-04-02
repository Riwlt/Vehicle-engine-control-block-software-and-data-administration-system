import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: String;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.returnUsername();
  }

  logoutAuth() {
    this.authenticationService.logout();
  }
  returnUsername() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    return this.username;
  }

}
