import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionDto } from '../modeles/MissionDto';

@Component({
  selector: 'app-modifi-mission-collaborateur',
  template: `
    <p>
      modifi-mission-collaborateur works!
    </p>
  `,
  styles: []
})
export class ModifiMissionCollaborateurComponent implements OnInit {
    id: string;
    listeMission: MissionDto;
    transport: any = {};
  constructor(private _dataService: DataService, private route: ActivatedRoute, private router: Router) {
  this.transport = [{
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
}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._dataService.recupererMissionAvecId(this.id)
    .subscribe( miss => {this.listeMission = miss;
    },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } );
  }
  }

}
