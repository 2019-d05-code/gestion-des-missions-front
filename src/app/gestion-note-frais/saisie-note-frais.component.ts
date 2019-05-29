import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FraisService } from './frais.service';
import { MissionDtoAvecFrais } from '../modeles/MissionDto';

@Component({
    selector: 'app-saisie-note-frais',
    templateUrl: './saisie-note-frais.component.html',
    styleUrls: ['./saisie-note-frais.component.css']
})
export class SaisieNoteFraisComponent implements OnInit {

    idMission: number;
    missionCourante: MissionDtoAvecFrais;

    constructor(private route: ActivatedRoute, private _fraisService: FraisService) { }

    ngOnInit() {


        this.route.paramMap.subscribe((params: ParamMap) => {
            this.idMission = parseInt(params.get('idMission'));

            this._fraisService.recupererMissionParId(this.idMission).subscribe(
                (mission: MissionDtoAvecFrais) => { this.missionCourante = mission; },
                (error: Error) => { alert(`${error.name} -> ${error.message})` },
                () => { }
            );
        });
    }
}


/*
this.idMission = parseInt(this.route.snapshot.paramMap.get('id'), 10);
this._fraisService.recupererMissionParId(this.idMission).subscribe(
    (mission: MissionDtoAvecFrais) => { this.missionCourante = mission; },
    (error: Error) => { alert(`${error.name} -> ${error.message}`); },
    () => { }
);
}

*/
