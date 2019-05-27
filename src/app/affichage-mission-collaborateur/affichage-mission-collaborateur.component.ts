import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styles: []
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    listeMission: Mission[] = new Array<Mission>();
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

    trierMissionDateDebutAsc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (new Date(missiona.dateDebut).getTime() - new Date(missionb.dateDebut).getTime());
            }
        );
        return this.listeMission;
    }

    trierMissionDateFinAsc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (new Date(missiona.dateFin).getTime() - new Date(missionb.dateFin).getTime());
            }
        );
        return this.listeMission;
    }

    trierMissionDateDebutDesc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (new Date(missionb.dateDebut).getTime() - new Date(missiona.dateDebut).getTime());
            }
        );
        return this.listeMission;
    }

    trierMissionDateFinDesc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (new Date(missionb.dateFin).getTime() - new Date(missiona.dateFin).getTime());
            }
        );
        return this.listeMission;
    }

    tri() {
        if (this.trierMissionDateDebutAsc) {
            this.trierPar = 'dateDebutAsc';
        } else if (this.trierMissionDateDebutDesc) {
            this.trierPar = 'dateDebutDesc';
        } else if (this.trierMissionDateFinAsc) {
            this.trierPar = 'dateFinAsc';
        } else if (this.trierMissionDateFinDesc) {
            this.trierPar = 'dateFinDesc';
        }
    }
}
