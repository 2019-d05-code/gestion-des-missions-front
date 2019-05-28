import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MissionFrais } from '../modeles/Mission';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
const URL_BACKEND = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class FraisService {

    private _listeMissions = new Subject<MissionFrais[]>();

    constructor(private _http: HttpClient) { }

    recupererMissions(idMission: number): Observable<MissionFrais[]> {
        return this._http.get<MissionFrais[]>(`${URL_BACKEND}frais/${idMission}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMissions.next(lisMis)));
    }

}
