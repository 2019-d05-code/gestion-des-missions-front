import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';
import { triggerAsyncId } from 'async_hooks';

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
        this.tri('dateDebutAsc');
        return this.listeMission;
    }

    trierMissionDateFinAsc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (new Date(missiona.dateFin).getTime() - new Date(missionb.dateFin).getTime());
            }
        );
        this.tri('dateFinAsc');
        return this.listeMission;
    }

    trierMissionDateDebutDesc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (new Date(missionb.dateDebut).getTime() - new Date(missiona.dateDebut).getTime());
            }
        );
        this.tri('dateDebutDesc');
        return this.listeMission;
    }

    trierMissionDateFinDesc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                return (new Date(missionb.dateFin).getTime() - new Date(missiona.dateFin).getTime());
            }
        );
        this.tri('dateFinDesc');
        return this.listeMission;
    }

    tri(valeur:string) {
        this.trierPar = valeur;
    }
}
