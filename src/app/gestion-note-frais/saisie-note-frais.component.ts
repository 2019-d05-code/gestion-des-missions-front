import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FraisService } from './frais.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth/auth.service';
import { MissionFrais } from '../modeles/Mission';

@Component({
    selector: 'app-saisie-note-frais',
    templateUrl: './saisie-note-frais.component.html',
    styleUrls: ['./saisie-note-frais.component.css']
})
export class SaisieNoteFraisComponent implements OnInit {

    mission: MissionFrais;
    listeMissionFrais: MissionFrais[];
    id: number;

    constructor(
        private route: ActivatedRoute,
        private _authentificationService: AuthService,
        private _serv: DataService,
        private _fraisService: FraisService,
        private router: Router,
    ) { }

    ngOnInit() { }

}
