import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mission, MissionManager, MissionSansStatus } from '../modeles/Mission';

import { environment } from '../../environments/environment';
import { MissionDto } from '../modeles/MissionDto';
const URL_BACKEND = environment.baseUrl;
@Injectable({
    providedIn: 'root'
})

export class PrimeService {
    private _listeMission = new Subject<MissionDto[]>();

    constructor(private _http: HttpClient) { }

    recupererListeMissionsDto(): Observable<MissionDto[]> {
        return this._http.get<MissionDto[]>(`${URL_BACKEND}prime`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMission.next(lisMis)));
    }
}
