import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MissionManager, MissionStatut } from '../modeles/Mission';

@Component({
    selector: 'app-manager-validation',
    templateUrl: './manager-validation.component.html',
    styles: []
})
export class ManagerValidationComponent implements OnInit {
    listeMission: MissionManager[];
    miss: MissionStatut = new MissionStatut(null, null);
    statut: any = {};

    constructor(private _serv: DataService) { }

    ngOnInit() {
        this.afficherListe();
    }

    afficherListe() {
        this._serv.recupererMissionManager()
            .subscribe(coll => { this.listeMission = coll; },
                (error: Error) => { });
    }

    valider(i: number) {
        // traitement du patch
        this.miss.id = this.listeMission[i].id;
        this.miss.statut = 2;
        this._serv.changerStatutMission(this.miss).subscribe(miss => {
            this.afficherListe();
        },
            (error: Error) => { },
            () => { });
    }

    refuser(i: number) {
        // traitement du patch
        this.miss.id = this.listeMission[i].id;
        this.miss.statut = 3;
        this._serv.changerStatutMission(this.miss).subscribe(miss => {
            this.afficherListe();
        },
            (error: Error) => { },
            () => { });
    }

}
