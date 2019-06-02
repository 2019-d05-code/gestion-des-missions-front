import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Frais } from '../modeles/Frais';
import { FraisService } from '../services/frais.service';
import { MissionDtoAvecFrais } from '../modeles/MissionDto';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
const URL_BACKEND = environment.baseUrl;

@Component({
    selector: 'app-saisie-note-frais',
    templateUrl: './saisie-note-frais.component.html',
    styleUrls: ['./saisie-note-frais.component.css']
})
export class SaisieNoteFraisComponent implements OnInit {

    messageErreur: string = "";

    id: number;
    idNoteDeFrais: number;
    missionCourante: MissionDtoAvecFrais = new MissionDtoAvecFrais(null, null, null, null, null, null, null, null, null, null);
    listeNotesDeFrais: Frais[] = new Array();
    noteDeFrais: Frais = this.missionCourante.frais;
    natures: any = {};
    dateFrais;
    natureFrais;
    montantFrais;

    constructor(
        private route: ActivatedRoute,
        private _http: HttpClient,
        private _fraisService: FraisService,
        private router: Router, ) {
        this.natures = [{
            name_id: 0,
            name: 'Hôtel'
        }, {
            name_id: 2,
            name: 'Petit-déjeuner'
        }, {
            name_id: 1,
            name: 'Restaurant'
        }, {
            name_id: 3,
            name: 'Transport'
        }];
    }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('missionId'), 10);
        this.recupererMissionParId();
        this.recupererListeNotesFrais();
    }

    recupererMissionParId(): void {
        this._http.get<MissionDtoAvecFrais>(`${URL_BACKEND}mission/${this.id}`).subscribe(
            (mission: MissionDtoAvecFrais) => { this.missionCourante = mission; },
            error => this.messageErreur = error.error,
            () => { }
        );
    }

    recupererListeNotesFrais(): void {
        this._http.get<Frais[]>(`${URL_BACKEND}frais/${this.id}`).subscribe(
            (listeNotesDeFrais: Frais[]) => { this.listeNotesDeFrais = listeNotesDeFrais; },
            error => this.messageErreur = error.error,
            () => { }
        );
    }

    valider() {
        this.noteDeFrais = new Frais(this.dateFrais, this.natureFrais, this.montantFrais);
        this._fraisService.ajouterNoteDeFrais(this.noteDeFrais, this.id).subscribe(
            nouvelleNoteDeFrais => {
                this.noteDeFrais = nouvelleNoteDeFrais;
                this.recupererListeNotesFrais();
            },
            error => this.messageErreur = error.error,
            () => { }
        );
    }

    validerModif(id) {
        this.noteDeFrais = new Frais(this.dateFrais, this.natureFrais, this.montantFrais, this.id);
        this._fraisService.modifierNoteDeFrais(this.noteDeFrais, id).subscribe(
            noteDeFraisModif => {
                this.noteDeFrais = noteDeFraisModif;
                this.recupererListeNotesFrais();
            },
            error => this.messageErreur = error.error,
            () => { }
        );
    }

    supprimer(id) {
        this._fraisService.supprimerNoteDeFrais(id).subscribe(() => this.recupererListeNotesFrais());
    }
}
