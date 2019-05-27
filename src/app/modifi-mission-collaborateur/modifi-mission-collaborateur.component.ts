import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionDto } from '../modeles/MissionDto';
import { Transport } from '../modeles/Transport';
import { Nature } from '../modeles/Nature';
import { NomNature } from '../modeles/NomNature';

@Component({
    selector: 'app-modifi-mission-collaborateur',
    templateUrl: `./modifi-mission-collaborateur.html`,
    styles: []
})
export class ModifiMissionCollaborateurComponent implements OnInit {
    id: Number;
    mission: MissionDto = new MissionDto(null, null, null, null, null, null, null, null);
    natures: any = {};
    transports: any = {};

    nature;
    transport;

    constructor(private _dataService: DataService, private route: ActivatedRoute, private router: Router) {
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

    valider() {

        this.mission.transport = Transport[this.transports.name_id];
        this.mission.nature = NomNature[this.natures.name_id];
        this.mission.id = this.id;
        this._dataService.modifierMission(this.id, this.mission)
            .subscribe(
                nouvelleMission => {
                    this.mission = nouvelleMission;
                    this.router.navigate(['/mission']);
                },
                (error: Error) => { alert(`${error.name} : ${error.message}`); },
                () => { }
            );
    }
    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this._dataService.recupererMissionAvecId(this.id)
            .subscribe((miss: MissionDto) => {
                this.mission = miss;
                console.log(this.mission);
                this.transport = this.mission.transport;
                this.nature = this.mission.nature;
            },
                (error: Error) => { alert(`${error.name} : ${error.message}`); });
    }
}


