import { Component, OnInit } from '@angular/core';
import { Mission } from '../modeles/Mission';
import { DataService } from '../services/data.service';
import { Transport } from '../modeles/Transport';
import { Router } from '@angular/router';

@Component({
    selector: 'app-creation-mission',
    templateUrl: './creation-mission.component.html',
    styleUrls: ['./creation-mission.component.css']
})
export class CreationMissionComponent implements OnInit {

    transport: any = {};
    mission: Mission = new Mission(null, null, null, null, null, null, null);

    constructor(private _dataService: DataService, private router: Router) {
        this.transport = [{
            name_id: 0,
            name: 'Avion'
        }, {
            name_id: 1,
            name: 'Covoiturage'
        }, {
            name_id: 2,
            name: 'Train'
        }, {
            name_id: 3,
            name: 'Voiture de service'
        }];
    }

    annuler() {
        this.router.navigate(['/mission']);
    }

    valider() {

        this.mission.transport = Transport[this.transport.name_id];
        this._dataService.ajouterMission(this.mission)
            .subscribe (
                nouvelleMission => {
                    this.mission = nouvelleMission;
                    this.router.navigate(['/mission']);
            },
                (error: Error) => { alert(`${error.name} : ${error.message}`); },
                () => {}
            );

    }

    ngOnInit() {
    }
}
