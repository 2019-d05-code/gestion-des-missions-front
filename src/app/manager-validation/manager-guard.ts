import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Profil } from '../modeles/Profil';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {

    constructor(
        private router: Router,
        private _authSrv: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this._authSrv.recupererCollConn()
            .pipe(
                map(collConn => collConn.roles.some(el => this.verification(el)))
            );

    }

    verification(element) {
        return element === Profil.Manager;
    }
}
