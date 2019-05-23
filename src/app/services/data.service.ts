import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Mission, MissionManager, MissionStatut } from '../modeles/Mission';

import { environment } from '../../environments/environment';
const URL_BACKEND = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _subjectMission = new Subject<Mission>();
    private _listeMission = new Subject<Mission[]>();
    private _listeManager = new Subject<MissionManager[]>();

    constructor(private _http: HttpClient) { }

    publish(data: Mission) {
        this._subjectMission.next(data);
    }

    voirMission(id: number): Observable<Mission> {
        return this._http.get<Mission>(`${URL_BACKEND}missions?id=${id}`, { withCredentials: true });
    }

    recupererMission(): Observable<Mission[]> {
        return this._http.get<Mission[]>(`${URL_BACKEND}mission`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMission.next(lisMis)));
    }

    ajouterMission(nouvelleMission: Mission): Observable<Mission> {
        const body = {
            'dateDebut': nouvelleMission.dateDebut,
            'dateFin': nouvelleMission.dateFin,
            'nature': nouvelleMission.nature,
            'villeDepart': nouvelleMission.villeDepart,
            'villeArrivee': nouvelleMission.villeArrivee,
            'transport': nouvelleMission.transport,
            'statut': nouvelleMission.statut
        };
        return this._http.post<Mission>(`${URL_BACKEND}mission`, body, { withCredentials: true })
            .pipe(tap(mission => {
                this.publish(mission);
            }));
    }

    recupererMissionManager(): Observable<MissionManager[]> {
        return this._http.get<MissionManager[]>(`${URL_BACKEND}manager`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeManager.next(lisMis)));
    }

    recupererMissionCollegue(idColl: number): Observable<MissionManager[]> {
        return this._http.get<MissionManager[]>(`${URL_BACKEND}collegue/${idColl}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeManager.next(lisMis)));
    }

    changerStatutMission(missionStatut): Observable<Mission> {
        return this._http.patch<Mission>(`${URL_BACKEND}manager`, missionStatut, { withCredentials: true })
    }

    modifierMission(mission: Mission): Observable<Mission> {
        return null;
    }
}
