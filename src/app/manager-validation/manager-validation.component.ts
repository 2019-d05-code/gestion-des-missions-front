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
    miss: MissionStatut;
    statut: any = {};

  constructor(private _serv:DataService) { }

  ngOnInit()
  {
    this._serv.recupererMissionManager()
    .subscribe( coll => {this.listeMission = coll; },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } );
  }

  valider(id: number)
  {
    this.miss.id = id;
    this.miss.statut = Statut.VALIDEE;
    this._serv.changerStatutMission(this.miss).subscribe( miss => {alert('envoyer');},
        (error: Error) => { alert(`${error.name} : ${error.message}`); } ,
        () => {}  );
  }

  refuser(id: number)
  {
    this.miss.id = id;
    this.miss.statut = Statut.REJETEE;
    this._serv.changerStatutMission(this.miss).subscribe( miss => {alert('envoyer'); },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } ,
        () => {}  );
  }

}
