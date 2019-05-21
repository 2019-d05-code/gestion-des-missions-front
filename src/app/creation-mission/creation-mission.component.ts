import { Component, OnInit } from '@angular/core';

import { Mission } from '../modeles/Mission';

@Component({
    selector: 'app-creation-mission',
    templateUrl: './creation-mission.component.html',
    styleUrls: ['./creation-mission.component.css']
})
export class CreationMissionComponent implements OnInit {

    mission: Mission = new Mission(null, null, null, null, null, null, null);
    transport: any = {};


    constructor() {
        this.transport = [{
            name_id: 0,
            name: '-- Transport --'
        }, {
            name_id: 1,
            name: 'Avion'
        }, {
            name_id: 2,
            name: 'Covoiturage'
        }, {
            name_id: 3,
            name: 'Train'
        }, {
            name_id: 4,
            name: 'Voiture de service'
        }]
    }

    valider() {
        return null;
    }

    annuler() {
        return null;
    }

    ngOnInit() {
    }

}
