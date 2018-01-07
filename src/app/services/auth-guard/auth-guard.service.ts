import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.user$.map(user => {
       // tslint:disable-next-line:curly
       if (user) return true;

       this.router.navigate(['/login'], {
         queryParams: {
           returnUrl: state.url
         }
       });
       return false;
    });
  }

}
