import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../modeles/Collaborateur';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  collaborateur: Collaborateur = new Collaborateur('email', 'motDePasse', undefined);
  err: boolean;

  constructor(private _authSrv: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  connecter() {
    this._authSrv.connecter(this.collaborateur.email, this.collaborateur.motDePasse)
      .subscribe(
        // en cas de succès, redirection vers la page /accueil
        col => this._router.navigate(['/accueil']),

        // en cas d'erreur, affichage d'un message d'erreur
        err => this.err = true
      );
  }

}
