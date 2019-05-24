import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styles: []
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    listeMission: Mission[] = new Array<Mission> ();
    constructor(private _serv: DataService) { }
    trierPar = '';

    ngOnInit() {
        this._serv.recupererListeMissions()
            .subscribe(coll => { this.listeMission = coll; },
                (error: Error) => { alert(`${error.name} : ${error.message}`); });
    }

    modifierMission(mission) {
        this._serv.modifierMission(mission);
    }

    supprimerMission() { }

    trierMissionDateDebut() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (missiona.dateDebut.getTime() - missionb.dateDebut.getTime());
            }
        );
    }

    trierMissionDateFin() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (missiona.dateFin.getTime() - missionb.dateFin.getTime());
            }
        );
    }

    tri() {
        if (this.trierMissionDateDebut) {
            this.trierPar = 'date de début';
        } else if (this.trierMissionDateDebut) {
            this.trierPar = 'date de fin';
        }
    }

}
