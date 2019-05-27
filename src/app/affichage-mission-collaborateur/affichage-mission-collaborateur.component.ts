import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';
import { MissionDto } from '../modeles/MissionDto';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styleUrls: ['./affichage-mission-collaborateur.component.css']
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    listeMissionDto: MissionDto[];
    id: Number;
    messageOk: string;
    listeMission: Mission[] = new Array<Mission>();
    constructor(private _serv: DataService, private router: Router, private route: ActivatedRoute) { }
    trierPar = '';

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.updateMission();
    }

    supprimerMission(id: number): void {
        this._serv.supprimerMission(id).subscribe(() => {
            this.messageOk = 'Suppression de la mission réussie';
            setTimeout(() => this.messageOk = undefined, 1000);
            this.updateMission();
        },
            (err: Error) => {
                alert(`${err.name} : ${err.message}`);
            });
    }

    updateMission(): void {
        this._serv.recupererListeMissionsDto().subscribe(coll => {
            this.listeMissionDto = coll;
        },
            (error: Error) => { alert(`${error.name} : ${error.message}`); });
    }

    trierMissionDateDebutAsc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missiona.dateDebut).getTime() - new Date(missionb.dateDebut).getTime());
            }
        );
        this.tri('dateDebutAsc');
        return this.listeMissionDto;
    }

    trierMissionDateFinAsc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missiona.dateFin).getTime() - new Date(missionb.dateFin).getTime());
            }
        );
        this.tri('dateFinAsc');
        return this.listeMissionDto;
    }

    trierMissionDateDebutDesc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missionb.dateDebut).getTime() - new Date(missiona.dateDebut).getTime());
            }
        );
        this.tri('dateDebutDesc');
        return this.listeMissionDto;
    }

    trierMissionDateFinDesc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missionb.dateFin).getTime() - new Date(missiona.dateFin).getTime());
            }
        );
        this.tri('dateFinDesc');
        return this.listeMissionDto;
    }

    tri(valeur: string) {
        this.trierPar = valeur;
    }

    trierMissionStatutAsc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                if (missiona.statut.toString < missionb.statut.toString) {
                    return -1;
                } else if (missiona.statut.toString > missionb.statut.toString) {
                    return 1;
                } else {
                    return 0;
                }
            }
        );
        this.tri('StatutAsc');
        return this.listeMission;
    }

    trierMissionStatutDesc() {
        this.listeMission.sort(
            (missiona: Mission, missionb: Mission) => {
                if (missiona.statut.toString > missionb.statut.toString) {
                    return -1;
                } else if (missiona.statut.toString < missionb.statut.toString) {
                    return 1;
                } else {
                    return 0;
                }
            }
        );
        this.tri('StatutDesc');
        return this.listeMission;
    }
}
