import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {
    constructor(
        private router: Router,
        private _authSrv: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean
    {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;

    const token = localStorage.getItem('token');

    // decode the token to get its payload
    const tokenPayload = decode(token);

    if (
      !this._authSrv.verifierAuthentification() ||
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
    }
}
