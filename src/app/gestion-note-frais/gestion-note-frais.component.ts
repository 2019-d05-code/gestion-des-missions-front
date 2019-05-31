import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FraisService } from '../services/frais.service';
import { MissionDtoAvecFrais } from '../modeles/MissionDto';
import { AuthService } from '../auth/auth.service';
import { CollConn } from '../modeles/Collaborateur';

@Component({
    selector: 'app-gestion-note-frais',
    templateUrl: './gestion-note-frais.component.html',
    styleUrls: ['./gestion-note-frais.component.css']
})
export class GestionNoteFraisComponent implements OnInit {

    id: number;
    trierPar = '';
    collegue: CollConn = new CollConn(null, null, null);
    listeMissionsDtoAvecFrais: MissionDtoAvecFrais[];
    mission: MissionDtoAvecFrais;
    missionEchue = false;

    constructor(
        private route: ActivatedRoute,
        private _authentificationService: AuthService,
        private _fraisService: FraisService,
    ) { }

    ngOnInit() {
        this._authentificationService.recupererCollConn().subscribe(collegue => {
            this.collegue = collegue;
            this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
            this.updateMissionAvecFrais(this.collegue.email);
        });
    }

    selectionnerMission() {
        this.listeMissionsDtoAvecFrais.forEach(mission => {
            this.mission = mission;
            this.afficherActions(mission);
        });
    }

    updateMissionAvecFrais(email: string): void {
        this._fraisService.recupererListeMissionsFraisParCollegue(email).subscribe(coll => {
            this.listeMissionsDtoAvecFrais = coll;
        });
    }

    trierMissionDateDebutAsc() {
        this.listeMissionsDtoAvecFrais.sort(
            (missiona: MissionDtoAvecFrais, missionb: MissionDtoAvecFrais) => {
                return (new Date(missiona.dateDebut).getTime() - new Date(missionb.dateDebut).getTime());
            }
        );
        this.tri('dateDebutAsc');
        return this.listeMissionsDtoAvecFrais;
    }

    trierMissionDateFinAsc() {
        this.listeMissionsDtoAvecFrais.sort(
            (missiona: MissionDtoAvecFrais, missionb: MissionDtoAvecFrais) => {
                return (new Date(missiona.dateFin).getTime() - new Date(missionb.dateFin).getTime());
            }
        );
        this.tri('dateFinAsc');
        return this.listeMissionsDtoAvecFrais;
    }

    trierMissionDateDebutDesc() {
        this.listeMissionsDtoAvecFrais.sort(
            (missiona: MissionDtoAvecFrais, missionb: MissionDtoAvecFrais) => {
                return (new Date(missionb.dateDebut).getTime() - new Date(missiona.dateDebut).getTime());
            }
        );
        this.tri('dateDebutDesc');
        return this.listeMissionsDtoAvecFrais;
    }

    trierMissionDateFinDesc() {
        this.listeMissionsDtoAvecFrais.sort(
            (missiona: MissionDtoAvecFrais, missionb: MissionDtoAvecFrais) => {
                return (new Date(missionb.dateFin).getTime() - new Date(missiona.dateFin).getTime());
            }
        );
        this.tri('dateFinDesc');
        return this.listeMissionsDtoAvecFrais;
    }

    tri(valeur: string) {
        this.trierPar = valeur;
    }

    afficherActions(mission: MissionDtoAvecFrais): void {
        this.missionEchue = false;
        if (new Date(mission.dateFin).getTime() < new Date().getTime()) {
            this.missionEchue = true;
        }
    }
}
