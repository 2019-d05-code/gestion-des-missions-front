import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    @Input() collegueConnecte;

    constructor(private _authSrv: AuthService, private _router: Router) { }

    seDeconnecter() {
        this._authSrv.seDeconnecter().subscribe(
            () => this._router.navigate(['/connexion'])
        );
    }

    ngOnInit() {
    }

}
