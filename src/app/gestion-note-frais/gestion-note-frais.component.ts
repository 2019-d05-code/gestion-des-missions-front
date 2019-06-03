import { AuthService } from '../auth/auth.service';
import { CollConn } from '../modeles/Collaborateur';
import { Component, OnInit } from '@angular/core';
import { FraisService } from '../services/frais.service';
import { HttpClient } from '@angular/common/http';
import { MissionDtoAvecFrais } from '../modeles/MissionDto';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { Frais } from '../modeles/Frais';
const URL_BACKEND = environment.baseUrl;

@Component({
    selector: 'app-gestion-note-frais',
    templateUrl: './gestion-note-frais.component.html',
    styleUrls: ['./gestion-note-frais.component.css']
})
export class GestionNoteFraisComponent implements OnInit {

    collegue: CollConn = new CollConn(null, null, null);
    id: number;
    listeMissionsDtoAvecFrais: MissionDtoAvecFrais[];
    listeNotesDeFrais: Frais[] = new Array();
    mission: MissionDtoAvecFrais;
    missionEchue = false;
    missionCourante: MissionDtoAvecFrais = new MissionDtoAvecFrais(null, null, null, null, null, null, null, null, null, null);
    montantPrime;
    trierPar = '';

    constructor(
        private route: ActivatedRoute,
        private _authentificationService: AuthService,
        private _fraisService: FraisService,
        private _http: HttpClient,
    ) { }

    ngOnInit() {
        this._authentificationService.recupererCollConn().subscribe(collegue => {
            this.collegue = collegue;
            this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
            this.updateMissionAvecFrais(this.collegue.email);
        });
    }

    calculPrime(id): void {
        this.montantPrime = 0;
        this.listeNotesDeFrais.forEach(noteDeFrais => {
            this.montantPrime += noteDeFrais.montant;
        })

        this.listeMissionsDtoAvecFrais.filter(mission => mission.id == id).forEach(mission => mission.prime = this.montantPrime.toFixed(2));
    }

    updateMissionAvecFrais(email: string): void {
        this._fraisService.recupererListeMissionsFraisParCollegue(email).subscribe(coll => {
            this.listeMissionsDtoAvecFrais = coll;

            for (let mission of this.listeMissionsDtoAvecFrais) {
                this.recupererListeNotesFrais(mission.id);
            }
        });
    }

    selectionnerMission() {
        this.listeMissionsDtoAvecFrais.forEach(mission => {
            this.mission = mission;
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

    afficherActions(mission: MissionDtoAvecFrais): boolean {
        this.missionEchue = false;
        if (new Date(mission.dateFin).getTime() < new Date().getTime()) {
            this.missionEchue = true;
        }
        return this.missionEchue;
    }

    recupererListeNotesFrais(idMission): void {
        this._http.get<Frais[]>(`${URL_BACKEND}frais/${idMission}`).subscribe(
            (listeNotesDeFrais: Frais[]) => {
                console.log(idMission);
                this.listeNotesDeFrais = listeNotesDeFrais;
                this.calculPrime(idMission);
            },
            (error: Error) => { },
            () => { }
        );
    }

    recupererMissionParId(): void {
        this._http.get<MissionDtoAvecFrais>(`${URL_BACKEND}mission/${this.id}`).subscribe(
            (mission: MissionDtoAvecFrais) => { this.missionCourante = mission; },
            (error: Error) => { },
            () => { }
        );
    }

    alertJS() {
        alert("Cette fonctionnalité arrivera sous peu, merci de patienter !");
    }


}
