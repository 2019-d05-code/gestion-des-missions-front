import { Component, OnInit } from '@angular/core';

import { Mission } from '../modeles/Mission';

@Component({
  selector: 'app-creation-mission',
  templateUrl: './creation-mission.component.html',
  styleUrls: ['./creation-mission.component.css']
})
export class CreationMissionComponent implements OnInit {

  mission: Mission = null;

  constructor() { }

  valider() {
    return null;
  }

  annuler() {
    return null;
  }

  ngOnInit() {
  }

}
