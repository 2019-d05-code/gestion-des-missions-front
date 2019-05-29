import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';
import { MissionDto } from '../modeles/MissionDto';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CollConn } from '../modeles/Collaborateur';
import { Absence } from '../modeles/Absence';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styleUrls: ['./affichage-mission-collaborateur.component.css']
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    // - attribut -
    id: Number;
    messageOk: string;
    trierPar = '';
    listeMission: Mission[] = new Array<Mission>();
    listeMissionDto: MissionDto[];
    listeAbsence: Absence[];
    collegue: CollConn = new CollConn(null, null, null);

    // - constructeur et données d'initialisation de la page -
    constructor(private _serv: DataService, private router: Router, private route: ActivatedRoute,
        private authentificationService: AuthService) { }

    ngOnInit() {
        this.authentificationService.recupererCollConn().subscribe(collegue => {
            this.collegue = collegue;
            this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
            this.updateMission(this.collegue.email);
            this.afficherAbsence(this.collegue.email);
            this.listeMissionDto.concat(this.listeAbsence); //concatener les deux et faire la transformation abscence -> mission
        });
    }

    // - methode appelant les requetes du back -
    supprimerMission(id: number): void {
        this._serv.supprimerMission(id).subscribe(() => {
            this.messageOk = 'Suppression de la mission réussie';
            setTimeout(() => this.messageOk = undefined, 1000);
            this.updateMission(this.collegue.email);
        });
    }

    updateMission(email: string): void {
        this._serv.recupererMissionCollegue(email).subscribe(coll => {
            this.listeMissionDto = coll;
        });
    }

    afficherAbsence(email: string)
    {
        this.authentificationService.verifierAuthentificationAbs().subscribe(//connecterAbsence(this.collegue.email, 'superpass').subscribe(
            col => {},
            err => {alert(`${err.name} : ${err.message}`);});
        this._serv.recupererListesAbscence(email).subscribe(abs => {
            this.listeAbsence = abs;
        });
    }

    // - fonction de tri -
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

        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {

                if (missiona.statut < missionb.statut) {
                    console.log(missionb.statut.toString);
                    return -1;
                } else if (missiona.statut > missionb.statut) {
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
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                if (missiona.statut > missionb.statut) {
                    return -1;
                } else if (missiona.statut < missionb.statut) {
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
