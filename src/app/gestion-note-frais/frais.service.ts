import { Frais } from '../modeles/Frais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MissionDto, MissionDtoAvecFrais } from '../modeles/MissionDto';
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
    private _missionEnCours = new Subject<MissionDtoAvecFrais>();

    constructor(private _http: HttpClient) { }

    recupererMissionParId(idMission: number): Observable<MissionDto> {
        return this._http.get<MissionDto>(`${URL_BACKEND}mission/${idMission}`);
    }

    recupererListeMissionsFraisParCollegue(email: string): Observable<MissionDtoAvecFrais[]> {
        return this._http.get<MissionDtoAvecFrais[]>(`${URL_BACKEND}collegue/${email}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMissionsDtoAvecFrais.next(lisMis)));
    }

    recupererListeNotesFrais(idMission: number): Observable<Frais[]> {
        return this._http.get<Frais[]>(`${URL_BACKEND}frais/${idMission}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeNotesFrais.next(lisMis)));
    }

}
