import { Component, OnInit } from '@angular/core';
import { CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { DataService } from '../services/data.service';
import { MissionManager } from '../modeles/Mission';
import { Collaborateur, CollConn } from '../modeles/Collaborateur';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styles: []
})
export class PlanningComponent implements OnInit {
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();

    listeMission: MissionManager[];
    connecte: CollConn;

    constructor(private _serv:DataService, private _authSrv: AuthService) { }

    ngOnInit()
    {
        this._authSrv.recupererCollConn().subscribe(
            (valeurObtenue) => {this.connecte = valeurObtenue; },
            error => {alert(error.error); },
            () => {});
    //pas ici                           ne donne pas l'id du collegue!!!!
    this._serv.recupererMissionCollegue(this.connecte.email)
    .subscribe( coll => {this.listeMission = coll; },
        (error: Error) => { alert(`${error.name} : ${error.message}`); } );
    }

    locale = 'fr';
	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
	weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
    //CalendarView = CalendarView;


    setView(view: CalendarView) {
        this.view = view;
      }

      /*closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
      }*/





}
