import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FraisService } from './frais.service';
import { MissionFrais } from '../modeles/Mission';
import { AuthService } from '../auth/auth.service';
import { CollConn } from '../modeles/Collaborateur';
import { DataService } from '../services/data.service';
import { MissionDto } from '../modeles/MissionDto';

@Component({
    selector: 'app-gestion-note-frais',
    templateUrl: './gestion-note-frais.component.html',
    styleUrls: ['./gestion-note-frais.component.css']
})
export class GestionNoteFraisComponent implements OnInit {

    id: Number;
    listeMissionFrais: MissionFrais[] = new Array<MissionFrais>();
    trierPar = '';
    collegue: CollConn = new CollConn(null, null, null);
    listeMissionDto: MissionDto[];
    missionEchue = false;

    constructor(
        private route: ActivatedRoute,
        private _authentificationService: AuthService,
        private _serv: DataService,
        private _fraisService: FraisService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.listeMissionFrais.push(new MissionFrais(
            new Date('01/01/2020'),
            new Date('01/01/2020'),
            'Formation',
            'Nantes',
            'Lyon',
            'Avion',
            undefined,
            'admin@dev.fr'
        ));
        this.listeMissionFrais.push(new MissionFrais(
            new Date('02/02/2018'),
            new Date('02/02/2018'),
            'Expertise',
            'Paris',
            'Toulouse',
            'Train',
            null,
            'manager@dev.fr'
        ));


        this._authentificationService.recupererCollConn().subscribe(collegue => {
            this.collegue = collegue;
            this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
            this.updateMission(this.collegue.email);
        });
    }

    updateMission(email: string): void {
        this._serv.recupererMissionCollegue(email).subscribe(coll => {
            this.listeMissionDto = coll;
        });
    }

    trierMissionDateDebutAsc() {
        this.listeMissionFrais.sort(
            (missiona: MissionFrais, missionb: MissionFrais) => {
                return (new Date(missiona.dateDebut).getTime() - new Date(missionb.dateDebut).getTime());
            }
        );
        this.tri('dateDebutAsc');
        return this.listeMissionFrais;
    }

    trierMissionDateFinAsc() {
        this.listeMissionFrais.sort(
            (missiona: MissionFrais, missionb: MissionFrais) => {
                return (new Date(missiona.dateFin).getTime() - new Date(missionb.dateFin).getTime());
            }
        );
        this.tri('dateFinAsc');
        return this.listeMissionFrais;
    }

    trierMissionDateDebutDesc() {
        this.listeMissionFrais.sort(
            (missiona: MissionFrais, missionb: MissionFrais) => {
                return (new Date(missionb.dateDebut).getTime() - new Date(missiona.dateDebut).getTime());
            }
        );
        this.tri('dateDebutDesc');
        return this.listeMissionFrais;
    }

    trierMissionDateFinDesc() {
        this.listeMissionFrais.sort(
            (missiona: MissionFrais, missionb: MissionFrais) => {
                return (new Date(missionb.dateFin).getTime() - new Date(missiona.dateFin).getTime());
            }
        );
        this.tri('dateFinDesc');
        return this.listeMissionFrais;
    }

    tri(valeur: string) {
        this.trierPar = valeur;
    }

    afficherAction(mission: MissionFrais): void {
        this.missionEchue = false;
        if (new Date(mission.dateFin).getTime() > new Date().getTime()) {
            this.missionEchue = true;
        }
    }
}
