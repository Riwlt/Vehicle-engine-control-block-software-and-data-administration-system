import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NavigationEnd, GuardsCheckStart, NavigationStart } from '@angular/router/src/events';

@Injectable()
export class TokenCheckGuard {

    constructor(private router: Router) {
      
    }

}
