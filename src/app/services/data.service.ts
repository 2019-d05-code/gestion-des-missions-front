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

  constructor(private _http: HttpClient) { }

  publish(data: Mission) {
    this._subjectMission.next(data);
  }

  voirMission(id: number): Observable<Mission> {
    return this._http.get<Mission>(`${URL_BACKEND}/missions?id=${id}`, {withCredentials : true});
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
    return this._http.post<Mission>(`${URL_BACKEND}/missions`, body, { withCredentials: true })
      .pipe(tap(mission => {
        this.publish(mission)
      }));
  }
}
