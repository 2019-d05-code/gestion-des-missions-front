import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Mission } from '../modeles/Mission';
import { MissionDto } from '../modeles/MissionDto';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { CollConn } from '../modeles/Collaborateur';
import { stringify } from '@angular/compiler/src/util';
import { PrimeService } from '../services/prime.service';
import { addYears } from 'date-fns';
import { MissingTranslationStrategy } from '@angular/compiler/src/core';

@Component({
    selector: 'app-prime',
    templateUrl: `./nature.component.html`,
    styleUrls: [`./nature.component.css`]
})
export class PrimeComponent implements OnInit {

    messageOk: string;
    trierPar = '';
    listeMission: Mission[] = new Array<Mission>();
    listeMissionDto: MissionDto[] = new Array<MissionDto>();
    listeYears: number[] = new Array();
    yearCondition: Date = new Date();
    constructor(private service: PrimeService, private router: Router) { }
    years: Date;
    data: any;
    functionYears(): any {
        for (let i: any = this.years.getFullYear() - 10; i <= this.years.getFullYear() + 5; i++) {
            this.listeYears.push(i);

        }
    }

    ngOnInit() {
        this.updateMission();
        this.years = new Date();
        this.functionYears();
        this.data = {
            chart: {},
            data: [
                { value: 500 },
                { value: 600 },
                { value: 700 }
            ]
        };

    }

    updateMission(): void {
        this.listeMissionDto.length = 0;
        this.service.recupererListeMissionsDto().subscribe(coll => {
            coll.forEach((mission: MissionDto) => {
                const tmp = new Date(mission.dateFin);
                const year = new Date(this.yearCondition);
                if (tmp.getFullYear() == year.getFullYear()) {
                    return this.listeMissionDto.push(mission);
                }
            });
        });

    }
    trierMissionDateDebutAsc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missiona.dateDebut).getTime() - new Date(missionb.dateDebut).getTime());
            }
        );
        this.tri('dateDebutAsc');
        return this.listeMissionDto;
    }

    trierMissionDateFinAsc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missiona.dateFin).getTime() - new Date(missionb.dateFin).getTime());
            }
        );
        this.tri('dateFinAsc');
        return this.listeMissionDto;
    }

    trierMissionDateDebutDesc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missionb.dateDebut).getTime() - new Date(missiona.dateDebut).getTime());
            }
        );
        this.tri('dateDebutDesc');
        return this.listeMissionDto;
    }

    trierMissionDateFinDesc() {
        this.listeMissionDto.sort(
            (missiona: MissionDto, missionb: MissionDto) => {
                return (new Date(missionb.dateFin).getTime() - new Date(missiona.dateFin).getTime());
            }
        );
        this.tri('dateFinDesc');
        return this.listeMissionDto;
    }

    tri(valeur: string) {
        this.trierPar = valeur;
    }
}
