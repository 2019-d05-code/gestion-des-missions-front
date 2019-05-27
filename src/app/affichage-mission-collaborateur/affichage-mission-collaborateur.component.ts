import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';
import { MissionDto } from '../modeles/MissionDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-affichage-mission-collaborateur',
    templateUrl: './affichage-mission-collaborateur.component.html',
    styleUrls: ['./affichage-mission-collaborateur.component.css']
})
export class AffichageMissionCollaborateurComponent implements OnInit {
    listeMission: MissionDto[];
    id: Number;
    messageOk: string;

    constructor(private _serv: DataService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.updateMission();
    }

    supprimerMission(id:number): void {
        this._serv.supprimerMission(id).subscribe(() => {
            this.messageOk = 'Suppression de la mission réussie';
            setTimeout(() => this.messageOk = undefined, 1000);
            this.updateMission();
        },
            (err: Error) => {
                alert(`${err.name} : ${err.message}`);
            });
    }

    updateMission(): void {
        this._serv.recupererListeMissions().subscribe(coll => {
        this.listeMission = coll;
        },
            (error: Error) => { alert(`${error.name} : ${error.message}`); });
    }

}
