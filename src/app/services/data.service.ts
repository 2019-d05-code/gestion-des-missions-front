import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Mission, MissionManager } from '../modeles/Mission';

import { environment } from '../../environments/environment';
import { MissionDto } from '../modeles/MissionDto';
const URL_BACKEND = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _subjectMission = new Subject<Mission>();
    private _listeMission = new Subject<MissionDto[]>();
    private _listeManager = new Subject<MissionManager[]>();
    private _listMissionForModif = new Subject<MissionDto>();

    constructor(private _http: HttpClient) { }

    publish(data: Mission) {
        this._subjectMission.next(data);
    }


    voirMission(id: number): Observable<Mission> {
        return this._http.get<Mission>(`${URL_BACKEND}mission?id=${id}`, { withCredentials: true });
    }


    recupererListeMissions(): Observable<Mission[]> {
        return this._http.get<Mission[]>(`${URL_BACKEND}mission`, { withCredentials: true })

    recupererListeMissionsDto(): Observable<MissionDto[]> {
        return this._http.get<MissionDto[]>(`${URL_BACKEND}mission`, { withCredentials: true })
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
            'statut': nouvelleMission.statut,
            'emailColl': nouvelleMission.emailColl
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


    recupererMissionCollegue(email: string): Observable<MissionManager[]> {
        return this._http.get<MissionManager[]>(`${URL_BACKEND}collegue/${email}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeManager.next(lisMis)));
    }

    changerStatutMission(missionStatut): Observable<Mission> {
        return this._http.patch<Mission>(`${URL_BACKEND}manager`, missionStatut, { withCredentials: true });

    }

    modifierMission(id: Number, mission: MissionDto): Observable<MissionDto> {
        console.log(mission);
        return this._http.patch<MissionDto>(`${URL_BACKEND}mission/${id}`, mission, { withCredentials: true });
    }
    recupererMissionAvecId(id: Number): Observable<MissionDto> {
        return this._http.get<MissionDto>(`${URL_BACKEND}mission/${id}`, { withCredentials: true }).pipe(
            tap(miss => {
                this._listMissionForModif.next(miss);
            })
        );
    }

    supremeMission(id: Number): Observable<MissionDto> {
        return this._http.delete<MissionDto>(`${URL_BACKEND}mission/${id}`, { withCredentials: true });

    }


}
