import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';
import { MissionDto } from '../modeles/MissionDto';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styleUrls: ['./affichage-mission-collaborateur.component.css']
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    listeMission: MissionDto[];
 id: string;


    constructor(private _serv: DataService,private route: ActivatedRoute) { }

  ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this._serv.recupererMission()
    .subscribe( coll => {this.listeMission = coll;
    },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } );
  }

    modifierMission(mission) {
        this._serv.modifierMission(mission);
    }

    supprimerMission() { }

}
