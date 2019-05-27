import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionDto } from '../modeles/MissionDto';
import { Transport } from '../modeles/Transport';
import { NomNature } from '../modeles/NomNature';

@Component({
    selector: 'app-modifier-mission-collaborateur',
    templateUrl: `./modifier-mission-collaborateur.component.html`,
    styleUrls: [`./modifier-mission-collaborateur.component.css`]
})
export class ModifierMissionCollaborateurComponent implements OnInit {
    id: Number;
    mission: MissionDto = new MissionDto(null, null, null, null, null, null, null, null);
    natures: any = {};
    transports: any = {};

    nature: any;
    transport: any;

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

        this.mission.transport = Transport[this.transport];
        this.mission.nature = NomNature[this.nature];
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
                this.transport = Transport[this.mission.transport];
                this.nature = NomNature[this.mission.nature];
            },
                (error: Error) => { alert(`${error.name} : ${error.message}`); });
    }
}


