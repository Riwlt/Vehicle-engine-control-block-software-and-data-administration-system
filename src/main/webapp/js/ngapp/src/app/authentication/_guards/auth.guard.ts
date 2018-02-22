import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NavigationStart } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                // For each view change do smth
            }
        });
    }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }



}
