import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Collaborateur, CollConn } from '../modeles/Collaborateur';
import { Profil } from '../modeles/Profil';
import { map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate
{


    constructor(
        private router: Router,
        private _authSrv: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {


    return this._authSrv.recupererCollConn()
    .pipe(
        tap(console.log),
        map(collConn => collConn.roles.some( el => this.verification(el)))
        ,
        tap(console.log)
    );

    /*
    subscribe(
        (valeurObtenue) => {this.connecte = valeurObtenue; },
        error => {alert(`${error.name} : ${error.message}`); },
        () => {});

    console.log(this.connecte.roles.some( el => this.verification(el) ));

    if (
      this._authSrv.verifierAuthentification() ||
      (this.connecte.roles.some( el => this.verification(el))) === false
    ) {
        this.router.navigate(['/erreur']);
        return false;

    }
        return true;
        */
    }

    verification(element)
    {
        return  element ===  Profil.Manager;
    }
}
