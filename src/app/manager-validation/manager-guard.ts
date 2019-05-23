import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Collaborateur } from '../modeles/Collaborateur';
import { Profil } from '../modeles/Profil';


@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate
{
    connecte: Collaborateur;
    actionSub: Subscription;

    constructor(
        private router: Router,
        private _authSrv: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
    this._authSrv.recupererCollConn().subscribe(
        (valeurObtenue) => {this.connecte = valeurObtenue; },
        error => {alert(error.error); },
        () => {});

    if (
      this._authSrv.verifierAuthentification() ||
      (this.connecte.profil === Profil.Manager) === false
    ) {
        this.router.navigate(['/erreur']);
        return false;

    }
        return true;
    }
}
