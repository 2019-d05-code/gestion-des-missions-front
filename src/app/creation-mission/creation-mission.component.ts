import { Component, OnInit } from '@angular/core';
import { Mission } from '../modeles/Mission';
import { DataService } from '../services/data.service';
import { Transport } from '../modeles/Transport';

@Component({
    selector: 'app-creation-mission',
    templateUrl: './creation-mission.component.html',
    styleUrls: ['./creation-mission.component.css']
})
export class CreationMissionComponent implements OnInit {

    transport: any = {};
    mission: Mission = new Mission(null, null, null, null, null, null, null);

    constructor(private _dataService: DataService) {
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
        this._dataService.recupererMission();
    }

    valider() {

        this.mission.transport = Transport[this.transport.name_id];
        this._dataService.ajouterMission(this.mission)
            .subscribe
            (nouvelleMission => { this.mission = nouvelleMission; },
                (error: Error) => { alert(`${error.name} : ${error.message}`); },
                () => { }
            );
        this._dataService.recupererMission();
    }

    ngOnInit() {
    }
}
