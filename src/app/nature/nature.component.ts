import { Component, OnInit } from '@angular/core';
import { NatureService } from '../services/nature.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Nature } from '../modeles/Nature';


@Component({
    selector: 'app-nature',
    templateUrl: `./nature.component.html`,
    styleUrls: [`./nature.component.css`]
})
export class NatureComponent implements OnInit {
    id: number;
    listeNature: Nature[];
    messageErreur = '';
    messageOk = '';
    constructor(private _serv: NatureService, private router: Router, private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.updateNature();
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    updateNature(): void {
        this._serv.recupererListNature().subscribe(coll => {
            this.listeNature = coll;
        });
    }

    supprimerNature(id: number): void {
        this._serv.supprimerNature(id).subscribe(() => {
            this.updateNature();
            this.messageErreur = undefined;
            this.messageOk = 'Suppression de la mission réussie';
            setTimeout(() => this.messageOk = undefined, 4000);
        },
            error => {
                this.messageOk = undefined;
                this.messageErreur = `${error.error}`;
                setTimeout(() => this.messageErreur = undefined, 4000);
            },
        );
    }

}
