import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class PermissionsGuard implements CanActivate {


    constructor(
        private router: Router) {

    }

    canActivate() {
        if (JSON.parse(localStorage.getItem('currentUser')).role === 'admin') {
            return true;
        } else {
            this.router.navigate(['/dashboard/data']);
        }
        return false;
    }

}
