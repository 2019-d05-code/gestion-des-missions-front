import { Component, OnInit } from '@angular/core';
import { NatureSansId } from '../modeles/NatureSansId';
import { NatureService } from '../services/nature.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Nature } from '../modeles/Nature';
import { BoolValuer } from '../modeles/BoolValuer';
import { NomNature } from '../modeles/NomNature';

@Component({
  selector: 'app-modif-nature',
  templateUrl: './modif-nature.component.html',
  styleUrls: ['./modif-nature.component.css']
})
export class ModifNatureComponent implements OnInit {
    natureMission: Nature = new Nature(null, null, null, null, null, null, null, null, null, null);
    natures: any = {};
    boolValuer: any = {};
    nature: any;
    bool: any;
    bool2: any ;
    id: number;
    messageErreur = '';
    messageOk = '';
      constructor(private _service: NatureService, private route: ActivatedRoute,private router: Router) {
        this.boolValuer = [{
            name_id: 0,
            name: 'Oui'
        }, {
            name_id: 1,
            name: 'Non'
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
    }]; }




    annuler() {
    this.router.navigate(['/nature']);
    }

    valider() {

        this.natureMission.facturee = this.boolValider(BoolValuer[this.bool]);
    this.natureMission.prime = this.boolValider(BoolValuer[this.bool2]);
    this.natureMission.depassementFrais = this.boolValider(BoolValuer[this.boolValuer.name_id]);
    this.natureMission.nomNature = NomNature[this.nature];
        this.natureMission.id = this.id;
        this._service.modifierNature(this.id, this.natureMission)
            .subscribe(
                nouvelleNature => {
                    this.natureMission = nouvelleNature;
                    this.messageErreur = undefined;
                this.messageOk = 'Modification of Nature successful';
                 setTimeout(() => this.messageOk = undefined, 4000);
                 setTimeout(() => this.router.navigate(['/nature']), 6000);
                },
                error => {
                    this.messageOk = undefined;
                    this.messageErreur = `${error.error}`;
                setTimeout(() => this.messageErreur = undefined, 5000);
            },
                () => { }
            );
    }
    boolValider(value: string): boolean {
        console.log(value);
      if (value == 'OUI') {
          return true;
      }
      return false;


    }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this._service.recupererNatureAvecId(this.id)
            .subscribe((miss: Nature) => {
                this.natureMission = miss;
                this.natureMission.facturee = this.boolValider(BoolValuer[this.bool]);
                this.natureMission.prime = this.boolValider(BoolValuer[this.bool2]);
                this.natureMission.depassementFrais = this.boolValider(BoolValuer[this.boolValuer.name_id]);
                this.natureMission.nomNature = NomNature[this.nature];
            },
                error => this.messageErreur = error.error)
    }
  }


