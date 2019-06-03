import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mission, MissionManager, MissionSansStatus } from '../modeles/Mission';

import { environment } from '../../environments/environment';
import { MissionDto } from '../modeles/MissionDto';
import { Nature } from '../modeles/Nature';
import { NatureSansId } from '../modeles/NatureSansId';
const URL_BACKEND = environment.baseUrl;
@Injectable({
    providedIn: 'root'
})
export class NatureService {
    private _subjectNature = new Subject<NatureSansId>();
    private _natureList = new Subject<Nature[]>();
    private _natureForModif = new Subject<Nature>();
    boolValue: boolean;
    constructor(private _http: HttpClient) { }

    publish(data: NatureSansId) {
        this._subjectNature.next(data);
    }

    recupererListNature(): Observable<Nature[]> {
        return this._http.get<Nature[]>(`${URL_BACKEND}nature`, { withCredentials: true })
            .pipe(tap(lisMis => this._natureList.next(lisMis)));

    }

    ajouterNature(nouvelleNature: NatureSansId): Observable <NatureSansId> {
       return this._http.post<NatureSansId>(`${URL_BACKEND}nature`, nouvelleNature, { withCredentials: true })
       .pipe(tap(nature => {
        this.publish(nature);
    }));
    }

    modifierNature(id: Number, nature: Nature): Observable<Nature> {
        return this._http.patch<Nature>(`${URL_BACKEND}nature/${id}`, nature, { withCredentials: true });
    }

    supprimerNature(id: Number): Observable<Nature> {
        return this._http.delete<Nature>(`${URL_BACKEND}nature/${id}`, { withCredentials: true });

    }

    recupererNatureAvecId(id: Number): Observable<Nature> {
        return this._http.get<Nature>(`${URL_BACKEND}nature/${id}`, { withCredentials: true }).pipe(
            tap(miss => {
                this._natureForModif.next(miss);
            })
        );
    }

}
