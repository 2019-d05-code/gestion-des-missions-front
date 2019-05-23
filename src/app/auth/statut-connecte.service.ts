import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "./auth.service";
import { map, tap } from "rxjs/operators";
import { of } from 'rxjs';

/**
 * Service utilisé par le routeur pour savoir si l'utilisateur est connecté.
 *
 * En cas d'utilisateur non connecté, il est redirigé vers la page de connexion.
 */
@Injectable({
    providedIn: 'root'
})
export class StatutConnecteService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    return this._authSrv.verifierAuthentification()
      .pipe(
        map(col => !col.estAnonyme()),
        tap(estConnecte => {
          if(!estConnecte) {
            this._router.navigate(['/connexion'])
          }
        })
      );
  }
}
