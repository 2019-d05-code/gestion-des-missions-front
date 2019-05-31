import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Mission, MissionManager, MissionSansStatus } from '../modeles/Mission';

import { environment } from '../../environments/environment';
import { MissionDto } from '../modeles/MissionDto';
import { Collegue } from '../auth/auth.domains';
import { Absence } from '../modeles/Absence';
const URL_BACKEND = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _subjectMission = new Subject<MissionSansStatus>();
    private _listeMission = new Subject<MissionDto[]>();
    private _listeManager = new Subject<MissionManager[]>();
    private _listMissionForModif = new Subject<MissionDto>();

    constructor(private _http: HttpClient) { }

    publish(data: MissionSansStatus) {
        this._subjectMission.next(data);
    }

    // -- requete get --
    voirMission(id: number): Observable<Mission> {
        return this._http.get<Mission>(`${URL_BACKEND}mission?id=${id}`, { withCredentials: true });
    }

    recupererListeMissions(): Observable<Mission[]> {
        return this._http.get<Mission[]>(`${URL_BACKEND}mission`, { withCredentials: true });
    }

    recupererListeMissionsDto(): Observable<MissionDto[]> {
        return this._http.get<MissionDto[]>(`${URL_BACKEND}mission`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMission.next(lisMis)));
    }

    recupererMissionManager(): Observable<MissionManager[]> {
        return this._http.get<MissionManager[]>(`${URL_BACKEND}manager`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeManager.next(lisMis)));
    }

    recupererMissionCollegue(email: string): Observable<MissionDto[]> {
        return this._http.get<MissionDto[]>(`${URL_BACKEND}collegue/${email}`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMission.next(lisMis)));
    }

    recupererMissionAvecId(id: Number): Observable<MissionDto> {
        return this._http.get<MissionDto>(`${URL_BACKEND}mission/${id}`, { withCredentials: true }).pipe(
            tap(miss => {
                this._listMissionForModif.next(miss);
            })
        );
    }

    // -- requete post --
    ajouterMission(nouvelleMission: MissionSansStatus): Observable<MissionSansStatus> {
        const body = {
            'dateDebut': nouvelleMission.dateDebut,
            'dateFin': nouvelleMission.dateFin,
            'nature': nouvelleMission.nature,
            'villeDepart': nouvelleMission.villeDepart,
            'villeArrivee': nouvelleMission.villeArrivee,
            'transport': nouvelleMission.transport,
            'emailColl': nouvelleMission.emailColl,
            'prime': nouvelleMission.prime
        };
        return this._http.post<MissionSansStatus>(`${URL_BACKEND}mission`, body, { withCredentials: true })
            .pipe(tap(mission => {
                this.publish(mission);
            }));
    }

    // -- requete patch --
    changerStatutMission(missionStatut): Observable<Mission> {
        return this._http.patch<Mission>(`${URL_BACKEND}manager`, missionStatut, { withCredentials: true });
    }

    modifierMission(id: Number, mission: MissionDto): Observable<MissionDto> {
        return this._http.patch<MissionDto>(`${URL_BACKEND}mission/${id}`, mission, { withCredentials: true });
    }

    // -- requete delete --
    supprimerMission(id: Number): Observable<MissionDto> {
        return this._http.delete<MissionDto>(`${URL_BACKEND}mission/${id}`, { withCredentials: true });

    }

    // -- requete vers les absences
    connexionAbsence()
    {
        return this._http.post<Collegue>('https://absences-back.cleverapps.io/login', { withCredentials: true });
    }

    recupererListesAbsence(email: string)
    {
        return this._http.get<Absence[]>(`https://absences-back.cleverapps.io/gestion-absences/listeAbsencesValidees?email=${email}`, { withCredentials: true });
    }


}
