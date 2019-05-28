import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CollConn } from './modeles/Collaborateur';
import { Observable } from 'rxjs';

/**
 * Composant principal de l'application.
 */
@Component({
    selector: 'app-root',
    templateUrl: `./app.component.html`,
    styles: []
})
export class AppComponent implements OnInit {

    collegueConnecteObservable: Observable<CollConn>;

    constructor(private _authSrv: AuthService, private _router: Router) {
    }

    /**
     * Action déconnecter collègue.
     */
    seDeconnecter() {
        this._authSrv.seDeconnecter().subscribe(
            value => this._router.navigate(['/connexion'])
        );
    }

    /**
     * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
     * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
     */
    ngOnInit(): void {
        this.collegueConnecteObservable = this._authSrv.recupererCollConn();
    }

}
