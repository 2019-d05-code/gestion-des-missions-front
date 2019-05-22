import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';

@Component({
  selector: 'app-manager-validation',
  templateUrl: './manager-validation.component.html',
  styles: []
})
export class ManagerValidationComponent implements OnInit
{
    listeMission:Mission[];

  constructor(private _serv:DataService) { }

  ngOnInit()
  {
    this._serv.recupererMission()
    .subscribe( coll => {this.listeMission = coll; },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } );
  }

  valider() {}

  refuser() {}

}
