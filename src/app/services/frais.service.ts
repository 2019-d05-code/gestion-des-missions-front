import { ActivatedRoute } from '@angular/router';
import { Frais } from '../modeles/Frais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MissionDtoAvecFrais } from '../modeles/MissionDto';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
const URL_BACKEND = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class FraisService {

    private _listeMissionsDtoAvecFrais = new Subject<MissionDtoAvecFrais[]>();
    private _listeNotesFrais = new Subject<Frais[]>();
    private _idMission: number;
    private _idNoteDeFrais: number;
    private _missionEnCours: MissionDtoAvecFrais;
    private _noteDeFraisSubject = new Subject<Frais>();

    constructor(private _http: HttpClient, private route: ActivatedRoute) { }

    recupererIdMission() {
        this._idMission = parseInt(this.route.snapshot.paramMap.get('missionId'), 10);
        return this._idMission;
    }

    recupereMissionEnCours(): MissionDtoAvecFrais {
        this._idMission = this.recupererIdMission();
        this.recupererMissionParId().subscribe(
            (mission: MissionDtoAvecFrais) => { this._missionEnCours = mission; },
            (error: Error) => { alert(`${error.name} : ${error.message}`); },
            () => { }
        );
        return this._missionEnCours;
    }

    recupererMissionParId(): Observable<MissionDtoAvecFrais> {
        this._idMission = this.recupererIdMission();
        return this._http.get<MissionDtoAvecFrais>(`${URL_BACKEND}mission/${this._idMission}`);
    }

    recupererListeMissionsFraisParCollegue(email: string): Observable<MissionDtoAvecFrais[]> {
        return this._http.get<MissionDtoAvecFrais[]>(`${URL_BACKEND}collegue/${email}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMissionsDtoAvecFrais.next(lisMis)));
    }

    recupererListeNotesFrais(): Observable<Frais[]> {
        return this._http.get<Frais[]>(`${URL_BACKEND}frais/${this._idMission}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeNotesFrais.next(lisMis)));
    }

    ajouterNoteDeFrais(nouvelleNoteDeFrais: Frais, idMission?: number): Observable<Frais> {
        const body = {
            'date': nouvelleNoteDeFrais.date,
            'nature': nouvelleNoteDeFrais.nature,
            'montant': nouvelleNoteDeFrais.montant
        };
        return this._http.post<Frais>(`${URL_BACKEND}frais/${idMission}`, body, { withCredentials: true }).pipe(
            tap(noteDeFrais => {
                this._noteDeFraisSubject.next(noteDeFrais);
            })
        );
    }

    supprimerNoteDeFrais(id: number, idMission?: number): Observable<Frais> {
        const body = {
            'id': id
        };
        return this._http.delete<Frais>(`${URL_BACKEND}frais/${idMission}`, body, { withCredentials: true }).pipe(
            tap(id => {
                this._idNoteDeFrais.next(id);
            })
        );
    }

    modifierNoteDeFrais(noteDeFraisModif: Frais, idMission?: number): Observable<Frais> {
        const body = {
            'date': noteDeFraisModif.date,
            'nature': noteDeFraisModif.nature,
            'montant': noteDeFraisModif.montant
        };
        return this._http.patch<Frais>(`${URL_BACKEND}frais/${idMission}`, body, { withCredentials: true }).pipe(
            tap(noteDeFrais => {
                this._noteDeFraisSubject.next(noteDeFrais);
            })
        );
    }
}
