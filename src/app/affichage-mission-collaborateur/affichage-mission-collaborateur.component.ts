import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styles: []
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    listeMission: Mission[];

    constructor(private _serv: DataService) { }

  ngOnInit()
  {
    this._serv.recupererMission()
    .subscribe( coll => {this.listeMission = coll; },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } );
  }

    modifierMission(mission) {
        this._serv.modifierMission(mission);
    }

    supprimerMission() { }

}
