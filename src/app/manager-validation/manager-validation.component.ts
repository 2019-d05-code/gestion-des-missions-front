import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission, MissionManager, MissionStatut } from '../modeles/Mission';
import { Statut } from '../modeles/Statut';

@Component({
  selector: 'app-manager-validation',
  templateUrl: './manager-validation.component.html',
  styles: []
})
export class ManagerValidationComponent implements OnInit
{
    listeMission: MissionManager[];
    miss: MissionStatut = new MissionStatut(null, null);
    statut: any = {};

  constructor(private _serv:DataService) { }

  ngOnInit()
  {
    this.afficherListe ();
  }

  afficherListe ()
  {
    this._serv.recupererMissionManager()
    .subscribe( coll => {this.listeMission = coll; },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } );
  }

  valider(i: number)
  {
    // traitement du patch
    this.miss.id = this.listeMission[i].id;
    this.miss.statut = 2;
    this._serv.changerStatutMission(this.miss).subscribe( miss => {
        alert('envoyer');
        this.afficherListe (); },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } ,
        () => {}  );
  }

  refuser(i: number)
  {
    // traitement du patch
    this.miss.id = this.listeMission[i].id;
    this.miss.statut = 3;
    this._serv.changerStatutMission(this.miss).subscribe( miss => {
        this.afficherListe ();
        alert('envoyer'); },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } ,
        () => {}  );
  }

}
