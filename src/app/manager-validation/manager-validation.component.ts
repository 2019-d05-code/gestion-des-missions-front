import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission, MissionManager, MissionStatut } from '../modeles/Mission';

@Component({
  selector: 'app-manager-validation',
  templateUrl: './manager-validation.component.html',
  styles: []
})
export class ManagerValidationComponent implements OnInit
{
    listeMission: MissionManager[];
    miss: MissionStatut;

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
    this.miss.statut = 2;
    this._serv.changerStatutMission(this.miss).subscribe( miss => {},
        (error: Error) => { alert(`${error.name} : ${error.message}`); } ,
        () => {}  );
  }

  refuser(id: number)
  {
    this.miss.id = id;
    this.miss.statut = 3;
    this._serv.changerStatutMission(this.miss).subscribe( miss => {},
        (error: Error) => { alert(`${error.name} : ${error.message}`); } ,
        () => {}  );
  }

}
