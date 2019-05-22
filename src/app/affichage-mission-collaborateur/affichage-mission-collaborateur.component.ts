import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styles: []
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    listeMission: Mission[];

    constructor(private _serv: DataService) { }

    ngOnInit() {
        this._serv.recupererMission()
            .subscribe(coll => { this.listeMission = coll; },
                err => { alert(err.error); });
    }

    modifierMission() { }

    supprimerMission() { }

}
