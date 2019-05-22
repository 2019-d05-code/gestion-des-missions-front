import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mission } from '../modeles/Mission';
import { environment } from '../../environments/environment';
const URL_BACKEND = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _subjectMission = new Subject<Mission>();

    private _listeMission = new Subject<Mission[]>();

    constructor(private _http: HttpClient) { }

    publish(data: Mission) {
        this._subjectMission.next(data);
    }

    voirMission(id: number): Observable<Mission> {
        return this._http.get<Mission>(`${URL_BACKEND}mission?id=${id}`, { withCredentials: true });
    }

    ajouterMission(nouvelleMission: Mission): Observable<Mission> {
        const body = {
            'dateDebut': nouvelleMission.dateDebut,
            'dateFin': nouvelleMission.dateFin,
            'villeDepart': nouvelleMission.villeDepart,
            'villeArrivee': nouvelleMission.villeArrivee,
            'transport': nouvelleMission.transport,
        };
        return this._http.post<Mission>(`${URL_BACKEND}mission`, body, { withCredentials: true })
            .pipe(tap(mission => {
                this.publish(mission);
            }));
    }

    recupererMission(): Observable<Mission[]> {
        return this._http.get<Mission[]>(`${URL_BACKEND}mission`, { withCredentials: true })
            .pipe(tap(lisMis => this._listeMission.next(lisMis)));

    }

}
