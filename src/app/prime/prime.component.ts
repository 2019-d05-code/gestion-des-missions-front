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

@Component({
  selector: 'app-prime',
  templateUrl: `./prime.component.html`,
  styleUrls: [`./prime.component.css`]
})
export class PrimeComponent implements OnInit {
    messageOk: string;
    trierPar = '';

    listeMission: Mission[] = new Array<Mission>();
    listeMissionDto: MissionDto[];
    constructor(private service: PrimeService, private router: Router) { }

  ngOnInit() {
      this.updateMission();
  }

  updateMission(): void {
    this.service.recupererListeMissionsDto().subscribe( coll => {
        this.listeMissionDto = coll;
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
