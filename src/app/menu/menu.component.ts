import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Profil } from '../modeles/Profil';
import { CollConn } from '../modeles/Collaborateur';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    @Input() collegueConnecte: CollConn;
    roleAdmin = false;
    roleManager = false;

    constructor(private _authSrv: AuthService, private _router: Router) { }

    seDeconnecter() {
        this._authSrv.seDeconnecter().subscribe(
            () => this._router.navigate(['/connexion'])
        );
    }

    ngOnInit() {
        this.roleAdmin = this.collegueConnecte.roles.some(el => el === Profil.Administrateur);
        this.roleManager = this.collegueConnecte.roles.some(el => el === Profil.Manager);
    }

}
