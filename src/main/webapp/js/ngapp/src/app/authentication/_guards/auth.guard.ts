import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { NavigationStart } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
             this.canActivate();
            }
        });
    }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        window.location.href = '/login';
        this.router.navigate(['/login']);
        return false;
    }



}
