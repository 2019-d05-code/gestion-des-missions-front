import { Component, OnInit } from '@angular/core';
import { NatureSansId } from '../modeles/NatureSansId';
import { NatureService } from '../services/nature.service';
import { Router } from '@angular/router';
import { NomNature } from '../modeles/NomNature';
import { BoolValuer, BoolValuer2, BoolValuer3 } from '../modeles/BoolValuer';

@Component({
  selector: 'app-creation-nature',
  templateUrl: `./creation-nature.component.html`,
  styles: ['./creation-nature.component.css']
})
export class CreationNatureComponent implements OnInit {
natureMission: NatureSansId = new NatureSansId(null, null, null, null, null, null, null, null, null);
natures: any = {};
boolValuer: any = {};
nature: any;
bool: any;
bool2: any ;
  constructor(private _service: NatureService, private router: Router) {
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
    this._service.ajouterNature(this.natureMission)
        .subscribe(
            nouvelleMission => {
                this.natureMission = nouvelleMission;
                this.router.navigate(['/nature']);
            },
            error => { },
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
  }

}
