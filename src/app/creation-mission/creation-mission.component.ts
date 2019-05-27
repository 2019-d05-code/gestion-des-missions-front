import { Component, OnInit } from '@angular/core';
import { Mission } from '../modeles/Mission';
import { DataService } from '../services/data.service';
import { Transport } from '../modeles/Transport';
import { Router } from '@angular/router';
import { Nature } from '../modeles/Nature';
import { Collaborateur, CollConn } from '../modeles/Collaborateur';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-creation-mission',
    templateUrl: './creation-mission.component.html',
    styleUrls: ['./creation-mission.component.css']
})
export class CreationMissionComponent implements OnInit {

    transports: any = {};
    natures: any = {};

    mission: Mission = new Mission(null, null, null, null, null, null, null, null);
    connecte: CollConn;


    constructor(private _dataService: DataService, private router: Router, private _authSrv: AuthService) {
        this.transports = [{
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

        this.natures = [{
            name_id: 0,
            name: 'Conseil'
        }, {
            name_id: 1,
            name: 'Expertise'
        }, {
            name_id: 2,
            name: 'Technique'
        }, {
            name_id: 3,
            name: 'Formation'
        }];
    }

    annuler() {
        this.router.navigate(['/mission']);
    }

    valider() {

        this.mission.transport = Transport[this.transports.name_id];
        this.mission.nature = Nature[this.natures.name_id];
        this.mission.emailColl = this.connecte.email;
        this._dataService.ajouterMission(this.mission)
            .subscribe(
                nouvelleMission => {
                    this.mission = nouvelleMission;
                    this.router.navigate(['/mission']);
                },
                (error: Error) => { alert(`${error.name} : ${error.message}`); },
                () => { }
            );

    }

    ngOnInit()
    {
        this._authSrv.recupererCollConn().subscribe(
            (valeurObtenue) => {this.connecte = valeurObtenue; },
            error => {alert(error.error); },
            () => {});
    }
}
