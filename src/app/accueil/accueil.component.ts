import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-accueil',
    template: `
    <img src="http://bleuchalou.b.l.pic.centerblog.net/c2730e27.gif" heigth="400" width="400">

    <h1>
      Bienvenue {{collegueConnecte.nom}} {{collegueConnecte.prenom}}
    </h1>

    <div>
    Tu es ici sur l'application de gestion des missions !
    </div>

  `,
    styles: []
})
export class AccueilComponent implements OnInit {

    collegueConnecte: Collegue;

    constructor(private _authSrv: AuthService) { }

    ngOnInit() {
        this._authSrv.collegueConnecteObs.subscribe(col => {
            this.collegueConnecte = col;
        });
    }

}
